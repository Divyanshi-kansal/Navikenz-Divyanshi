# 🤖 AI GitHub Repository Assistant

An AI-powered chatbot that enables users to interact with GitHub repositories using natural language. The application combines **FastAPI**, **React**, **LangChain**, and **Large Language Models (LLMs)** to provide repository search, repository details, GitHub user repository listings, mathematical calculations, current date & time, and conversational AI in a modern chat interface.

---

## 📌 Overview

The AI GitHub Repository Assistant is a full-stack chatbot application developed as an internship project. It integrates multiple tools with an LLM to provide intelligent responses while maintaining conversation history and user authentication.

The chatbot can:

- Search GitHub repositories
- Display repository details
- List repositories of any GitHub user
- Perform mathematical calculations
- Return the current date & time
- Maintain chat history
- Support multiple chat sessions
- Authenticate users using JWT
- Allow guest users with limited free chats

---

# ✨ Features

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

# 🏗 System Architecture

```text
                    User
                      │
                      ▼
              React Frontend
                      │
                  Axios API
                      │
                      ▼
              FastAPI Backend
                      │
              LangChain Service
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
      LLM                     Custom Tools
        │                           |                       |               ┌───────────┼───────────┐
        │               │           │           │
        ▼               ▼           ▼           ▼
    Response        GitHub API   Calculator   Date & Time
        │
        ▼
 PostgreSQL Database
(Chat History + Users)
```

---

# 🛠 Tech Stack

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

# 📂 Project Structure

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

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/your-repository.git

cd your-repository
```

---

# 🖥 Backend Setup

Create Virtual Environment

```bash
python -m venv .venv
```

Activate Environment

Windows

```bash
.venv\Scripts\activate
```

Linux / Mac

```bash
source .venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🌐 Frontend Setup

Move to frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=postgresql://username:password@localhost/db_name

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30

GROQ_API_KEY=your_groq_api_key
```

---

# ▶ Running the Application

## Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/signup` | Register User |
| POST | `/signin` | Login User |
| POST | `/forgot-password` | Reset Password |
| POST | `/chat` | Send Chat Message |
| GET | `/chat/history/{session_id}` | Chat History |
| GET | `/chat/sessions` | Chat Sessions |
| DELETE | `/chat/session/{session_id}` | Delete Chat |

---

# 🤖 AI Tools

## GitHub Repository Search

Search repositories by keyword.

Example

```
Search FastAPI repositories
```

---

## Repository Details

Retrieve detailed information.

Example

```
Tell me about microsoft/vscode
```

---

## User Repositories

List repositories of any GitHub user.

Example

```
Show repositories of microsoft
```

---

## Calculator

Example

```
125*89+92
```

---

## Current Date & Time

Example

```
What is today's date?
```

---

# 💾 Database

The project stores:

- User Information
- Chat History
- Chat Sessions
- Guest Sessions

---
