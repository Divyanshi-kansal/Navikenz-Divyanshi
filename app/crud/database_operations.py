from sqlalchemy.orm import Session
from app.models.user import User

def create_user(db: Session, user , hashed_password: str):
    new_user = User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        age=user.age,
        password=hashed_password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Find a user by email
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# Find a user by ID
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# Delete a user row
def delete_user_from_db(db: Session, user: User):
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

# Update password for a user
def update_user_password(db: Session, user: User, new_password: str):
    user.password = new_password
    db.commit()
    db.refresh(user)
    return {"message": "Password updated successfully"}

#find all users
def get_all_users(db: Session):
    return db.query(User).all()