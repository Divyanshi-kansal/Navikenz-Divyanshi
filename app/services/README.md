# services

## services.py

This file contains the bussiness logic of this application.

### Responsiblities

- User registration
- User authentication
- Password reset
- Dashboard generation
- Chat session management
- Chat history retrieval
- Free chat limit validation
- Calling LangChain for AI responses
- Saving chat messages to the database.

It acts as a bridge between API routes,the database ,and the Langchain services.

---

## langchain_services.py

This file manages the complete AI workflow using LangChain.

## Responsibilities

- Build conversation messages
- Send prompts to the LLM
- Detect tool calls
- Execute LangChain tools
- Return tool results to the LLM
- Generate the final AI response

This file is responsible only for AI reasoning and tool execution. It does not interact directly with the database or handle user authentication.

---