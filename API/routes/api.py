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
async def submit(file: bytes = Form(...), userId: str = Form(...), username: str = Form(...)):

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
            points = POINTS.get(material)

            item_data['material'] = material

            material_score_breakdown[material] = {
                'occurrence': occurrence,
                'points': points * occurrence,
            }

            total_points = total_points + (points * occurrence)

            # db.collection(...).add(...) auto-generates a unique id for the insert
            db.collection("items").add(item_data)

    # ** is used to compose dictionaries
    # https://www.python.org/dev/peps/pep-0448/
    breakdown = {
        **{'material_score_breakdown': material_score_breakdown},
        **{'total_points': total_points},
        **{'material_box_coordinates': material_coords}}

    return breakdown


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
        print(username, item)
        points = item['points']
        material = item['material']

        if username in leaderboards:
            if material in leaderboards[username]['materials']:
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

CLASSES = {
    0: "plastic",
    1: "paper",
    2: "metal",
    3: "cardboard",
    4: "organic",
    5: "glass",
    6: "waste"
}

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


@router.get("/user_stats")
async def getStats(userId):
    def getStatBreakDown(items):
        obj = {'materials': {}, 'total': 0}

        for item in items:
            item = item.to_dict()
            points = item['points']
            material = item['material']

            if material in obj['materials']:
                obj['materials'][material]['points'] += points
                obj['materials'][material]['occurrence'] = obj['materials'][material]['occurrence'] + 1
            else:
                obj['materials'][material] = {}
                obj['materials'][material]['points'] = points
                obj['materials'][material]['occurrence'] = 1
            obj['total'] += points

        return obj

    today = datetime.date.today()

    # wrap in int because if the request parameter is set it will default to a string
    since_week = today - datetime.timedelta(int(7))
    since_month = today - datetime.timedelta(int(30.5))
    since_year = today - datetime.timedelta(int(365))

    # convert datetime object into firebase timestamp object
    past_week_timestamp = datetime.datetime.combine(
        since_week, datetime.datetime.min.time()
    )

    past_month_timestamp = datetime.datetime.combine(
        since_month, datetime.datetime.min.time()
    )
    past_year_timestamp = datetime.datetime.combine(
        since_year, datetime.datetime.min.time()
    )

    # saves us from querying 3 times : )
    all_items_query = db.collection('items').where(
        'userId', '==', str(userId))

    all_items = all_items_query.stream()
    past_week_items = all_items_query.where(
        'date', '>', past_week_timestamp).stream()
    past_month_items = all_items_query.where(
        'date', '>', past_month_timestamp).stream()
    past_year_items = all_items_query.where(
        'date', '>', past_year_timestamp).stream()

    all_time_stat_breakdown = getStatBreakDown(all_items)
    past_week_stat_breakdown = getStatBreakDown(past_week_items)
    past_month_stat_breakdown = getStatBreakDown(past_month_items)
    past_year_stat_breakdown = getStatBreakDown(past_year_items)

    user_info = {
        **{'all_time_stat_breakdown': all_time_stat_breakdown},
        **{'all_week_stat_breakdown': past_week_stat_breakdown},
        **{'past_month_stat_breakdown': past_month_stat_breakdown},
        **{'past_year_stat_breakdown': past_year_stat_breakdown},
    }

    return user_info
