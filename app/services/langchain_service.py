from langchain_core.messages import ToolMessage

from app.langchain_flow.chain import llm_with_tools
from app.langchain_flow.messages import build_messages
from app.langchain_flow.tools import (
    calculator,
    current_datetime,
    get_user_repositories,
    get_repository,
    search_repository,
)

# Dictionary of available tools
available_tools = {
    "calculator": calculator,
    "current_datetime": current_datetime,
    "get_user_repositories": get_user_repositories,
    "get_repository": get_repository,
    "search_repository":search_repository,
}


def generate_reply(chat_history,question: str):

    messages = build_messages(chat_history,question)

    # First LLM call
    ai_response = llm_with_tools.invoke(messages)

    messages.append(ai_response)

    # Execute tool if requested
    if ai_response.tool_calls:

        for tool_call in ai_response.tool_calls:

            tool_name = tool_call["name"]
            print(ai_response.tool_calls)
            tool = available_tools[tool_name]

            tool_result = tool.invoke(tool_call["args"])
            print("\n========== TOOL CALLED ==========")
            print("Tool:", tool_name)
            print(tool_result)
            print("=================================\n")
            
            if tool_name in ["get_user_repositories", "get_repository", "search_repository"]:
                return tool_result
        
            messages.append(
                ToolMessage(
                    content=str(tool_result),
                    tool_call_id=tool_call["id"],
                )
            )

        # Second LLM call after tool execution
        final_response = llm_with_tools.invoke(messages)

        return final_response.content
        

    # No tool needed
    return ai_response.content