from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.api import contacts, stats

# Create tables on startup if database exists
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning: Database initialization skipped on startup ({e})")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Interactive Swagger API Documentation for Sadugudu Studios Backend. Manage contact form submissions & studio statistics stored in PostgreSQL.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(contacts.router, prefix=settings.API_V1_STR)
app.include_router(stats.router, prefix=settings.API_V1_STR)

# Mount Frontend static files
import os
from fastapi.staticfiles import StaticFiles
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../frontend"))
if os.path.exists(frontend_path):
    app.mount("/site", StaticFiles(directory=frontend_path, html=True), name="frontend")

@app.get("/")
def root():
    return {
        "message": "Welcome to Sadugudu Studios API",
        "docs": "/docs",
        "health": "/api/health",
        "website": "/site"
    }

@app.get(f"{settings.API_V1_STR}/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": settings.PROJECT_NAME}
