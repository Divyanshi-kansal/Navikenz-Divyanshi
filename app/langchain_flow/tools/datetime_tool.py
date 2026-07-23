from langchain_core.tools import tool
from datetime import datetime

@tool
def current_datetime() -> str:
    """
    Returns the current date and time.
    """

    return datetime.now().strftime("%d %B %Y %I:%M %p")