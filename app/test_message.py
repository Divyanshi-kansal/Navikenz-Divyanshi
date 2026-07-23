from app.langchain_flow.chain import llm_with_tools
from app.langchain_flow.messages import SYSTEM_MESSAGE
from langchain_core.messages import HumanMessage

messages = [
    SYSTEM_MESSAGE,
    HumanMessage(content="What is 25 * 17?")
]

response = llm_with_tools.invoke(messages)

print(response)