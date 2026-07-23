# Sadugudu Studios

A modern, full-stack application built with a vanilla frontend and a robust FastAPI + PostgreSQL backend.

## 🚀 Project Structure

```
sadugudustudios/
├── frontend/             # Frontend application
│   ├── index.html        # Main HTML page
│   ├── styles.css        # Design system & custom styling
│   ├── script.js         # Interactive JavaScript & API client
│   ├── favicon.png       # Site icon
│   ├── logo.png          # Studio branding
│   └── public/           # Public static resources
│
├── backend/              # FastAPI Python backend
│   ├── app/              # FastAPI application modules
│   │   ├── main.py       # FastAPI application entry point & CORS
│   │   ├── config.py     # Environment & application settings
│   │   ├── database.py   # SQLAlchemy database connection & session
│   │   ├── models.py     # PostgreSQL database models
│   │   ├── schemas.py    # Pydantic request/response schemas
│   │   └── api/          # REST endpoints (contacts, stats)
│   ├── requirements.txt  # Python package dependencies
│   ├── Dockerfile        # Container build definition
│   └── .env.example      # Example environment variables
│
├── docker-compose.yml    # Docker Compose setup for PostgreSQL & FastAPI
├── .gitignore
└── README.md
```

## 🛠️ Tech Stack & Features

- **Frontend**: Lightweight HTML5, CSS3, and JavaScript with interactive hold-to-submit form and dynamic API connection.
- **Backend**: Python FastAPI service with automatic OpenAPI documentation (`/docs`).
- **Database**: PostgreSQL with SQLAlchemy ORM and Pydantic schemas.
- **Containerization**: Ready for `docker-compose` to run PostgreSQL and FastAPI seamlessly.

## 🏃 Running the Application

### Option 1: Using Docker Compose (Recommended)
Run the backend and database simultaneously with a single command:

```bash
docker-compose up --build
```

- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/api/health

Open `frontend/index.html` in your web browser or serve it using any HTTP server (e.g. `npx serve frontend` or Live Server).

### Option 2: Local Python Execution

1. Navigate to `backend/`:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```
2. Start PostgreSQL locally and update `DATABASE_URL` in `.env`.
3. Launch FastAPI backend:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
