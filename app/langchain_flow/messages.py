from langchain_core.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage
)
SYSTEM_MESSAGE = SystemMessage(
    content="""You are a helpful AI assistant. Give clear,concise and accurate answers"""
)
def build_messages(chat_history,current_question):
    messages=[SYSTEM_MESSAGE]
    for chat in chat_history:
        if chat.sender =="user":
            messages.append(
                HumanMessage(content=chat.message)
            )
        else:
            messages.append(
                AIMessage(content=chat.message)
            )    
    messages.append(
        HumanMessage(content=current_question)
    )

    return messages        