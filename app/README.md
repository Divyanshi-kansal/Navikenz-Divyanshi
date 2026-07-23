# app

The backend is developed using FastAPI.

---

## Responsibilities

- User Authentication
- JWT Token Generation
- Chat APIs
- LangChain Integration
- Database Operations
- GitHub Tool Integration

---

## Folder Structure

`crud/`
contains Database queries.

`database/`
owns SQLAlchemy engine setup and schema maintenance.

`langchain_flow/`
It contains tools execution,LLM,prompt building,message and memory saver

`models/`
contains SQLAIchemy models

`routers/`
contains all API endpoints.

`schemas/`
contains Pydantic schemas.

`utils/`
Security, hashing and helper functions.

---

## Backend Setup

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

## How to Run Backend?

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---