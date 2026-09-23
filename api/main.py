from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.items_router import router as items_router

app = FastAPI()
origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods="*",
    allow_headers="*",
    allow_credentials=True
)
prefix = "/api"
# add security to this line for api key verification
app.include_router(items_router, prefix=prefix)

@app.get("/health")
def health():
    return {"ok": "True"}


