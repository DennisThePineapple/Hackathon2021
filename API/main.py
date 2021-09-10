# Packages
import uvicorn
from fastapi import FastAPI

# # Modules
# from core.config import settings
# from api.v1.main import v1_router

# # Configure app
app = FastAPI(title="Binnit")
# app.include_router(v1_router)

# Run app
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)