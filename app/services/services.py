from app.services.langchain_service import generate_reply
from app.utils.security import hash_password,verify_password
from app.crud.database_operations import (
    create_user, 
    get_user_by_email, 
    get_user_by_id, 
    delete_user_from_db, 
    update_user_password, 
    get_all_users
)
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.user import User as UserModel
from app.models.chat import ChatMessage


# SIGN UP (CREATE USER)
def add_user(db: Session, user):
    # 1. Prevent duplicate email accounts
    existing_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered.")
       
    # 2. Extract input dictionary values
    user_data = user.model_dump() if hasattr(user, "model_dump") else dict(user)
    raw_password = str(user_data.get("password", ""))
        
    
    user_data["password"] = hash_password(raw_password)
    
    db_user = UserModel(**user_data)
    
    # 6. Save the record directly to your database table
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


# SIGN IN (LOGIN)
def authenticate_user(db: Session, credentials):
    user = get_user_by_email(db, credentials.email)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "status": "success",
        "message": "Login successful",
        "user_id": user.id
    }

# FORGOT PASSWORD (RESET)
def reset_password(db: Session, data):
    user = get_user_by_email(db, data.email)
    if not user:
        return {"status": "error", "message": "Email not found"}
    
    raw_new_password = str(data.new_password)
    hashed_password = hash_password(data.new_password)

    return update_user_password(
        db,
        user,
        hashed_password
    )
    

# DELETE USER
def remove_user(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    delete_user_from_db(db, user)
    return {"status": "success", "message": "User deleted successfully"}

# DASHBOARD SCREEN
def get_dashboard_data(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "status": "success",
        "welcome_message": f"Welcome back, {user.name}!",
        "profile": {
            "id": user.id,
            "username": user.name,
            "email": user.email
        }
    }
# FETCH ALL USERS
def GetAllUsers(db: Session):
    return get_all_users(db=db)


def get_chat_history(db: Session, session_id: str, user_id: int = None):

    if user_id:
        return (
            db.query(ChatMessage)
            .filter(
                ChatMessage.user_id == user_id,
                ChatMessage.session_id == session_id
            )
            .order_by(ChatMessage.created_at.asc())
            .all()
        )

    return (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )


def handle_chat_message(db: Session, session_id: str, message_text: str, user_id: int = None ,guest_id=None):
    
    if user_id is None:

    # Check if this session already exists
        existing_chat = (
            db.query(ChatMessage)
            .filter(ChatMessage.session_id == session_id,
                    ChatMessage.guest_id == guest_id)
            .first()
        )

    # This is a brand-new chat
        if existing_chat is None:

            total_chats = (
                db.query(ChatMessage.session_id)
                .filter(ChatMessage.guest_id == guest_id)
                .distinct()
                .count()
            )

            if total_chats >= 3:
                return {
                    "status": "auth_required",
                    "message": "You have reached your limit of 3 free chats. Please sign in to continue."
                }
    history = get_chat_history(
        db=db,
        session_id=session_id,
        user_id=user_id
    )

    try:
        bot_reply_text = generate_reply(
            history,
            message_text
        )
    except Exception as e:
        bot_reply_text = f"LangChain Error: {str(e)}"

    user_msg = ChatMessage(
        user_id=user_id,
        guest_id=guest_id,
        session_id=session_id,
        sender="user",
        message=message_text
    )
    db.add(user_msg)
    
    bot_msg = ChatMessage(
        user_id=user_id,
        guest_id=guest_id,
        session_id=session_id,
        sender="bot",
        message=bot_reply_text
    )
    db.add(bot_msg)
    
    db.commit()
    
    return {
        "status": "success",
        "reply": bot_reply_text
    }


def get_chat_sessions(db: Session, user_id=None, guest_id=None):

    query = db.query(ChatMessage.session_id).distinct()

    if user_id:
        query = query.filter(ChatMessage.user_id == user_id)
    else:
        query = query.filter(ChatMessage.guest_id == guest_id)

    session_ids = query.order_by(ChatMessage.session_id.desc()).all()

    result = []

    for (session_id,) in session_ids:

        first_message = (
            db.query(ChatMessage)
            .filter(
                ChatMessage.session_id == session_id,
                ChatMessage.sender == "user"
            )
            .order_by(ChatMessage.created_at.asc())
            .first()
        )

        result.append({
            "session_id": session_id,
            "title": first_message.message if first_message else "New Chat"
        })

    return result


def delete_chat_session(db: Session, session_id: str, user_id=None, guest_id=None):

    query = db.query(ChatMessage).filter(ChatMessage.session_id == session_id)

    if user_id:
        query = query.filter(ChatMessage.user_id == user_id)
    else:
        query = query.filter(ChatMessage.guest_id == guest_id)

    deleted = query.delete()

    db.commit()

    return {
        "status": "success",
        "deleted_messages": deleted
    }