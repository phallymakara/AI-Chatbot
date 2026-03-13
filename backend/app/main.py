from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 1. Import the middleware
from app.routes.chat import router as chat_router
from app.routes.upload import router as upload_router

app = FastAPI()

# 2. Add the CORS configuration right after initializing app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows  React app to connect
    allow_credentials=True,
    allow_methods=["*"],  # Allows POST, OPTIONS, etc.
    allow_headers=["*"],  # Allows Content-Type, Authorization, etc.
)

app.include_router(chat_router)
app.include_router(upload_router)

@app.get("/")
def health_check():
    return {"status": "HR Chatbot API running"}