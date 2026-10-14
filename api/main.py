from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.items_router import router as items_router
from routers.userprofile_router import router as profile_router

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
# Everytime a new router is added YOU MUST ADD IT HERE.
app.include_router(items_router, prefix=prefix)
app.include_router(profile_router, prefix=prefix)

@app.get("/health")
def health():
    return {"ok": "True"}


