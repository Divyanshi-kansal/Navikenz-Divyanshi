# Navikenz

This project is an AI-powered chatbot developed using **FastAPI** for the backend and **React (Vite)** for the frontend. It integrates **LangChain** with the **GPT-OSS-120B** model to generate intelligent responses and stores chat history in a PostgreSQL database.

---

# Features

### 👤 User Authentication

- User Registration
- Secure Login
- JWT Authentication

### 💬 Chat Features

- Multiple Chat Sessions
- Delete Chat Session
- Chat History
- Guest Chat Limit (3 Chats)

### 🛠 GitHub Tools

- Search GitHub repositories
- Get repository details
- View repositories of any GitHub user

### ⚙ Utility Tools

- Calculator
- Current Date & Time

---

# Tech Stack

## Frontend

- React
- Axios
- React Markdown

## Backend

- FastAPI
- Python
- SQLAlchemy
- Pydantic
- JWT Authentication

## Database

- PostgreSQL

## AI & LLM

- LangChain
- Groq API
- openai/gpt-oss-120b
- OpenAI Compatible API

## APIs

- GitHub REST API

---

## 📂 Project Structure

```text
Project
│
├── app
│    ├── crud
│    ├── database
│    ├── langchain_flow
│    ├── models
│    ├── routers
│    ├── schemas
│    ├── services
│    ├── utils
│    └── main.py
│  
│             
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .env
├── requirements.txt
├── docker-compose.yml
├── README.md
└── .gitignore
```

---
