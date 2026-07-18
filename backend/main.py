from fastapi import FastAPI
import os
import django

# Initialize Django so FastAPI can use its ORM if needed
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
try:
    django.setup()
except Exception as e:
    print("Django setup failed, probably because DB is not ready yet during build:", e)

app = FastAPI(title="BizBeacon FastAPI")

@app.get("/")
def read_root():
    return {"message": "Welcome to BizBeacon API"}

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok"}
