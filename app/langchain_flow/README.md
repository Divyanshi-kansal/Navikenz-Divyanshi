# LangChain Flow

This folder contains the omplete AI workflow.

## Files

### chain.py

Binds all available tools with the LLM.

---

### llm.py

Initialize the LLM using Groq.

---

### memory.py

contains Memory saver

---

### messages.py

Creates conversation history.

Converts database messages into

- HumanMessage
- AIMessage
- SystemMessage

---

### prompt.py

contains System and user prompt.

---

## Folder

### tools

`calculator.py/`
performs mathematical calculations.

`datetime.py/`
Returns current date and time.

`github_tool.py/`
Provides Github Functionality.

Available tools

- User Repositories.
- Repositories Detail.
- Search Repositories.

---