from app.langchain_flow.llm import llm
from app.langchain_flow.tools import(
    calculator, 
    current_datetime,
    get_user_repositories,
    get_repository,
    search_repository,
)

# Bind the tools to the LLM
llm_with_tools = llm.bind_tools(
    [
        calculator,
        current_datetime,
        get_user_repositories,
        get_repository,
        search_repository,
    ]
)