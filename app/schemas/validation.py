from pydantic import BaseModel,Field,field_validator,EmailStr
import re

class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, description="User's full name")
    email: EmailStr
    password: str = Field(..., min_length=6, description="Password must be at least 6 characters")
    phone: str = Field(..., min_length=10, max_length=10, description="10-digit phone number")
    age: int = Field(..., ge=1, le=120, description="Age must be between 1 and 120")


    @field_validator('name')
    @classmethod
    def validate_name(cls, value: str) -> str:
        stripped = value.strip()
        if not re.match(r"^[a-zA-Z\s]+$", stripped):
            raise ValueError("Name must only contain letters and spaces")
        return stripped

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not value.isdigit():
            raise ValueError("Phone number must contain digits only")
        return value

    @field_validator('password')
    @classmethod
    def validate_password(cls, value: str) -> str:
        # Loophole catch: Prevent users from setting a password that is just empty spaces
        if " " in value:
            raise ValueError("Password cannot contain spaces")
        return value

    @field_validator('email')
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.lower().strip()
    

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    age: int

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
   
    email: EmailStr = Field(..., description="The registered email address")
    
    password: str = Field(..., min_length=6, description="Password must be at least 6 characters")

    @field_validator('email')
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.lower().strip()


class ForgotPasswordInput(BaseModel):
    
    email: EmailStr = Field(..., description="The registered email address")

    new_password: str = Field(..., min_length=6, max_length=100, description="New password must be at least 6 characters")

    @field_validator('email')
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.lower().strip()

    @field_validator('new_password')
    @classmethod
    def validate_password(cls, value: str) -> str:
        if " " in value:
            raise ValueError("Password cannot contain spaces")
        return value


UserCreate.model_rebuild()
UserLogin.model_rebuild()
ForgotPasswordInput.model_rebuild()