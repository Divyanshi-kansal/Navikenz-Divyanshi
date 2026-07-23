from app.langchain_flow.chain import chat_chain

response = chat_chain.invoke(
    {
        "question": "What is LangChain?"
    }
)

print(response.content)