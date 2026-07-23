from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from .user import Base 

class ChatMessage(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) 
    guest_id = Column(String(255), nullable=True)
    session_id = Column(String(255), nullable=False) 
    sender = Column(String(50), nullable=False) 
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())