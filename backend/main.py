from fastapi import FastAPI
import os
import django

# Initialize Django so FastAPI can use its ORM if needed
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
try:
    django.setup()
except Exception as e:
    print("Django setup failed, probably because DB is not ready yet during build:", e)

from fastapi.middleware.cors import CORSMiddleware
from api.routers import search, dashboard, reports, collect, notifications, users

app = FastAPI(title="BizBeacon FastAPI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router)
app.include_router(dashboard.router)
app.include_router(reports.router)
app.include_router(collect.router)
app.include_router(notifications.router)
app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to BizBeacon API"}

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok"}
