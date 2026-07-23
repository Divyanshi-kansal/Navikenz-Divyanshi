from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful AI assistant. Give clear, concise, and accurate answers."
        ),
        (
            "human",
            "{question}"
        )
    ]
)