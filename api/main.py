from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods="*",
    allow_headers="*",
    allow_credentials=True
)

@app.get("/health")
def health():
    return {"ok": "True"}


