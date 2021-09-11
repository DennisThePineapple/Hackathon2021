from fastapi import APIRouter, FastAPI, File, Form, UploadFile

import datetime

from pydantic import BaseModel

# Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

router = APIRouter(prefix='/api', tags=['api'])

# Use a service account
credentials = credentials.Certificate('./auth.json')
firebase_admin.initialize_app(credentials)

db = firestore.client()

# receive a photo and userId
# compute recyclable materials and points in pytorch model
# store results in db and send down points breakdown objects


@router.post('/submit')
async def test(file: UploadFile = File(...), userId: str = Form(...)):
    # replace RHS with real model inference invocation e.g. `materials = InferMaterials(file)``
    materials = {
        'plastic': 1,
        'paper': 2,
        'metal': 3
    }

    date = datetime.datetime.now()

    item_data = dict()
    item_data['userId'] = userId
    item_data['date'] = date

    for item in materials.items():
        (material, points) = item
        item_data['material'] = material
        item_data['points'] = points

        # db.collection(...).add(...) auto-generates a unique id for the insert
        await db.collection("items").add(item_data)

    return materials


@ router.get('/leaderboards')
async def test():
    return "leaderboards endpoint"
