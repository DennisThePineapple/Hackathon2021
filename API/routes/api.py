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

# how many points should each material be?
POINTS = {
    'plastic': 1,
    'paper': 1,
    'metal': 1,
    'cardboard': 1,
    'organic': 1,
    'glass': 1,
    'waste': 1
}

# receive a photo and userId
# compute recyclable materials and points in pytorch model
# store results in db and send down points breakdown objects
# param userId should be the generated id from firebase auth


@router.post('/submit')
async def test(file: UploadFile = File(...), userId: str = Form(...)):
    # replace RHS with real model inference invocation e.g. `materials = InferMaterials(file)``
    materials = {
        # material : occurrences
        'plastic': 1,
        'paper': 1,
        'metal': 1,
        'cardboard': 0,
        'organic': 0,
        'glass': 0,
        'waste': 0
    }

    material_breakdown = dict()

    total_points = 0

    date = datetime.datetime.now()

    item_data = dict()
    item_data['userId'] = userId
    item_data['date'] = date

    for item in materials.items():
        (material, occurrence) = item
        if (occurrence > 0):
            # calculate points by multiplying number of item with point per material type
            points = occurrence * POINTS.get(material)

            item_data['material'] = material
            item_data['points'] = points

            material_breakdown[material] = {
                'occurrence': occurrence,
                'points': points,
            }

            total_points = total_points + points

            # db.collection(...).add(...) auto-generates a unique id for the insert
            db.collection("items").add(item_data)

    # ** is used to compose dictionaries
    # https://www.python.org/dev/peps/pep-0448/
    return {**material_breakdown, **{'total_points': total_points}}


@ router.get('/leaderboards')
async def test():
    return "leaderboards endpoint"
