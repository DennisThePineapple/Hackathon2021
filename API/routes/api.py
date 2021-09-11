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
# submit form data to this endpoint, not http request body attributes


@router.post('/submit')
async def submit(file: UploadFile = File(...), userId: str = Form(...), username: str = Form(...)):
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
    item_data['username'] = username
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
async def leaderboards(past_days=7):

    leaderboards = dict()

    today = datetime.date.today()

    # wrap in int because if the request parameter is set it will default to a string
    since = today - datetime.timedelta(int(past_days))

    # convert datetime object into firebase timestamp object
    timestamp = datetime.datetime.combine(
        since, datetime.datetime.min.time()
    )

    items = db.collection('items').where('date', '>', timestamp).stream()

    for item in items:
        item = item.to_dict()
        username = item['username']
        points = item['points']
        material = item['material']

        if username in leaderboards:
            if material in leaderboards[username]:
                leaderboards[username]['materials'][material]['points'] += points
                leaderboards[username]['materials'][material]['occurrence'] += 1
            else:
                leaderboards[username]['materials'][material] = {}
                leaderboards[username]['materials'][material]['points'] = points
                leaderboards[username]['materials'][material]['occurrence'] = 1
            leaderboards[username]['total'] += points
        else:
            leaderboards[username] = {'materials': {}, 'total': 0}
            leaderboards[username]['materials'][material] = {}
            leaderboards[username]['materials'][material]['points'] = points
            leaderboards[username]['materials'][material]['occurrence'] = 1
            leaderboards[username]['total'] += points

    return leaderboards



from io import BytesIO
from PIL import Image
from model.inference import Inference

# Set up model inferencing
model = Inference()

CLASSES = {0: "metal", 1: "cardboard"}

# Returns an array from the model predictions containing the class name
def get_class_array(tensor_array):
    class_array = tensor_array[:5] + [CLASSES[tensor_array[5]]]
    return class_array


@router.post("/predict")
async def predict(file: bytes = File(...), userId: str = Form(...)):
    # Open the image as PIL
    image = Image.open(BytesIO(file))

    # Run model on the image
    results = model.predict(image)

    # Format results
    format_results = [
        dict(zip(["x1", "y1", "x2", "y2", "conf", "class"], get_class_array(i)))
        for i in results.xyxyn[0].tolist()
    ]

    return format_results