import os
import jwt
from fastapi import Request
from typing import Optional
from fastapi import Request
from datetime import datetime, timedelta ,timezone
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv

load_dotenv()
# 1. Password Hashing Engine Setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="users/signin",
    auto_error=False
)
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/signin")
# 2. Secret Key Setup 
SECRET_KEY = os.getenv("Secret_Key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# --- PASSWORD UTILS ---
def hash_password(password: str) -> str:
    """Converts plain text passwords into secure unreadable hashes."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    
    return pwd_context.verify(plain_password, hashed_password)

# --- JWT UTILS ---
def create_access_token(data: dict) -> str:
    
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})  
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

#oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/signin")

def get_current_user(
    request: Request,
    token: Optional[str] = Depends(oauth2_scheme)
):
    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("email")
        user_id = payload.get("sub")

        if email is None or user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return {
            "id": int(user_id),
            "email": email
        }

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
    
def get_optional_current_user(
    token: Optional[str] = Depends(oauth2_scheme)
):
    if token is None:
        return None

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("email")
        user_id = payload.get("sub")

        if email is None or user_id is None:
            return None

        return {
            "id": int(user_id),
            "email": email
        }

    except Exception:
        return None
