from fastapi import APIRouter, Depends, Header, HTTPException, status
from app.utils.security import verify_password, create_access_token,get_current_user,get_optional_current_user
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import Security
from pydantic import BaseModel        
from app.models.chat import ChatMessage as ChatModel       
from app.database.session import get_db
from app.schemas.validation import UserCreate, UserResponse, UserLogin, ForgotPasswordInput
from app.models.user import User as UserModel
from app.langchain_flow.tools.github_tool import get_user_repositories , get_repository 


from app.services.services import (
    add_user, 
    authenticate_user, 
    remove_user, 
    reset_password, 
    get_dashboard_data,
    handle_chat_message,   
    get_chat_history,
    get_chat_sessions ,
    delete_chat_session    
)

router = APIRouter()

# Pydantic Schema for Chat
class ChatInput(BaseModel):
    message: str
    session_id: str 
    guest_id: str | None = None 

# SIGN UP
@router.post("/users/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    return add_user(db, user)

# SIGN IN
@router.post("/users/signin")
def signin(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(
        UserModel.email == credentials.email
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    if not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

# POST DELETE
@router.post("/users/{user_id}/delete")
def post_delete(user_id: int, db: Session = Depends(get_db)):
    return remove_user(db, user_id)

# GET DELETE
@router.get("/users/{user_id}/delete")
def get_delete(user_id: int, db: Session = Depends(get_db)):
    return remove_user(db, user_id)

# GET CREATE
@router.get("/users/create")
def get_create():
    return {"message": "Send a POST request to /users/signup to create a user profile"}

# FORGOT PASSWORD (POST)
@router.post("/users/forgot-password")
def forgot_password(data: ForgotPasswordInput, db: Session = Depends(get_db)):
    return reset_password(db, data)

# DASHBOARD (GET)
@router.get("/users/dashboard/{user_id}")
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    return get_dashboard_data(db, user_id)


# SEND CHAT MESSAGE
@router.post("/chat/message")
def post_chat_message(
    data: ChatInput, 
    db: Session = Depends(get_db), 
    current_user: dict = Depends(get_optional_current_user)
):
    return handle_chat_message(db, session_id=data.session_id, message_text=data.message, user_id=current_user["id"] if current_user else None,guest_id=data.guest_id)

# GET CHAT HISTORY
@router.get("/chat/history/{session_id}")
def get_history(
    session_id: str, 
    guest_id: str = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_optional_current_user) 
):
    # Filter the database queries strictly by the current user's unique ID
    if current_user:
        history_logs = (
            db.query(ChatModel)
            .filter(
                ChatModel.user_id == current_user["id"],
                ChatModel.session_id == session_id
            )
            .order_by(ChatModel.created_at.asc())
            .all()
        )

    # Guest user
    else:
        history_logs = (
            db.query(ChatModel)
            .filter(
                ChatModel.guest_id == guest_id,
                ChatModel.session_id == session_id
            )
            .order_by(ChatModel.created_at.asc())
            .all()
        )
    
    return {"status": "success", "history": history_logs}


#this is temporarily
@router.get("/test")
def test(current_user=Depends(get_current_user)):
    return current_user

#this is for chat_session
@router.get("/chat/sessions")
def chat_sessions(
    guest_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_optional_current_user)
):

    return get_chat_sessions(
        db=db,
        user_id=current_user["id"] if current_user else None,
        guest_id=guest_id
    )    


@router.get("/github/{username}")
def github(username: str):

    return get_user_repositories.invoke({"username": username})

@router.get("/github/{owner}/{repo}")
def github_repo(owner: str, repo: str):
    return get_repository.invoke(
        {
            "owner": owner,
            "repo": repo
        }
    )    


@router.delete("/chat/session/{session_id}")
def delete_session(
    session_id: str,
    guest_id: str = None,
    db: Session = Depends(get_db),
    current_user=Depends(get_optional_current_user)
):

    return delete_chat_session(
        db=db,
        session_id=session_id,
        user_id=current_user["id"] if current_user else None,
        guest_id=guest_id
    )