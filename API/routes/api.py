from model.inference import Inference
from PIL import Image
from io import BytesIO
from fastapi import APIRouter, File, Form, UploadFile

import datetime

# Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import base64
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
async def submit(file: str = Form(...), userId: str = Form(...), username: str = Form(...)):

    image = BytesIO(base64.b64decode(file)).read()

    material_coords = await predict(image, userId)

    # this is a simplified version of the array above
    # containing only the material and the number of occurrences
    materials = dict()

    for data in material_coords:
        material = data["class"]
        if material in materials:
            materials[material] += 1
        else:
            materials[material] = 1

    material_score_breakdown = dict()

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

            material_score_breakdown[material] = {
                'occurrence': occurrence,
                'points': points,
            }

            total_points = total_points + points

            # db.collection(...).add(...) auto-generates a unique id for the insert
            db.collection("items").add(item_data)

    # ** is used to compose dictionaries
    # https://www.python.org/dev/peps/pep-0448/
    return {**{'material_score_breakdown': material_score_breakdown}, **{'total_points': total_points}, **{'material_box_coordinates': material_coords}}


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

    sorted_leaderboards = sorted(
        leaderboards.items(), key=lambda x: x[1]['total'], reverse=True)

    return sorted_leaderboards

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
