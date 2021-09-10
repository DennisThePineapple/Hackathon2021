from fastapi import APIRouter, FastAPI, File, Form, UploadFile

router = APIRouter(prefix='/api', tags=['api'])

from pydantic import BaseModel

# Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
credentials = credentials.Certificate('./auth.json')
firebase_admin.initialize_app(credentials)

db = firestore.client()

@router.post('/submit')
async def test( file: UploadFile = File(...), userId: str = Form(...)):
    return {
        "file_size": len(file),
        "userdId": userId
    }

@router.get('/leaderboards')
async def test():
    return "leaderboards endpoint"