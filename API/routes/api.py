from typing import Dict, List, NewType, Type
from PIL import Image
from io import BytesIO
from fastapi import APIRouter, File, Form
from datetime import datetime, timedelta, date, tzinfo
from operator import itemgetter
from ml.inference import Inference
from model.material import Points
from model.stats import StatsResponse
from model.submit import SubmitResponse
from model.leaderboard import LeaderBoardUser
from helpers.stats import update_stats_breakdown
from helpers.leaderboard import create_leaderboard_user, update_leaderboard_user
from helpers.submit import get_class_array, update_material_breakdown
from firebase_admin import firestore, credentials, initialize_app

# Setup router
router = APIRouter(prefix='/api', tags=['api'])

# Set up model inferencing
model = Inference()

# Setup firestore
credentials = credentials.Certificate('./auth.json')
initialize_app(credentials)
db = firestore.client()


# receive a photo and userId
# compute recyclable materials and points in pytorch model
# store results in db and send down points breakdown objects
# param userId should be the generated id from firebase auth
# submit form data to this endpoint, not http request body attributes
@router.post('/submit', response_model=SubmitResponse)
async def submit(file: bytes = File(...), userId: str = Form(...), username: str = Form(...)):
    # Mutable structs
    material_breakdown = dict()
    total_points = 0

    # Open the image as PIL
    image = Image.open(BytesIO(file))

    # Run model on the image
    results = model.predict(image)

    # Get bounding box dictionary
    boundings = [
        dict(zip(["x1", "y1", "x2", "y2", "conf", "material"], get_class_array(i)))
        for i in results.xyxyn[0].tolist()
    ]

    # For each entry in the dictionary...
    for bounding in boundings:
        # Increment the total points
        total_points += Points[bounding['material']].value
        # Update the material breakdown dictionary
        update_material_breakdown(bounding['material'], material_breakdown)

        # Save the item to the database
        db.collection("items").add({
            'userId': userId, 
            'username': username,
            'date': datetime.now(),
            'material': bounding['material']
        })

    # Return the structured data
    return {
        'total': total_points,
        'breakdown': material_breakdown,
        'boundings': boundings
    }


@router.get('/leaderboards', response_model=List[LeaderBoardUser])
async def leaderboards(past_days: int = 7):
    # Leaderboard dictionary
    leaderboard = dict()

    # Comparator to retrieve items up to a given timestamp
    since = datetime.now() - timedelta(days=past_days)

    # Get all items matching the date comparitor 
    items = db.collection('items').where('date', '>', since).stream()

    # For each item in the collection...
    for item in items:
        item = item.to_dict()

        # Desctructure values
        userId, userName, material = itemgetter('userId', 'username', 'material')(item)

        # If the user is already in the leaderboard, update their leaderboard entry
        if userId in leaderboard:
            update_leaderboard_user(userId, material, leaderboard)
        # Otherwise, create a new leaderboard entry for them
        else:
            leaderboard[userId] = create_leaderboard_user(userName, material)

    # Return the list, sorted by the users total points
    return sorted(list(leaderboard.values()), key=lambda user: user['totalPoints'], reverse=True)


@router.get("/user_stats", response_model=StatsResponse)
async def getStats(userId: str):

    all_items = {'materials': {}, 'total': 0}
    year_items = {'materials': {}, 'total': 0}
    month_items = {'materials': {}, 'total': 0}

    since_month = datetime.now() - timedelta(days=30.5)
    since_year = datetime.now() - timedelta(days=365)

    items = db.collection('items').where('userId', '==', userId).stream()

    # For each item in the collection...
    for item in items:
        item = item.to_dict()

        # Desctructure values
        material, date = itemgetter('material', 'date')(item)

        # Update monthly stats
        if date.replace(tzinfo=None) > since_month:
            update_stats_breakdown(material, month_items)

        # Update yearly stats
        if date.replace(tzinfo=None) > since_year:
            update_stats_breakdown(material, year_items)

        # Update all time stats
        update_stats_breakdown(material, all_items)

    return {
        'all_time': all_items,
        'year': year_items,
        'month': month_items
    }