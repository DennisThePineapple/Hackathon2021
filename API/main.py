# Packages
import uvicorn
from fastapi import FastAPI

# Modules
from routes import api

# # Configure app
app = FastAPI(title="Binnit")
app.include_router(api.router)

# Run app
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)