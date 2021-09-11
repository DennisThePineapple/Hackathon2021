
from model.leaderboard import LeaderBoardUser
from model.material import MaterialLiteral, Points
from typing import Dict

# Creates a user entry in the leaderboard
def create_leaderboard_user(userName: str, material: MaterialLiteral):
    return {
        'name': userName,
        'totalPoints': Points[material].value,
        'materials': {
            material: {
                'occurences': 1,
                'points': Points[material].value
            }
        }
    }

# Updates a user entry in the leaderboard
def update_leaderboard_user(userId: str, material: MaterialLiteral, board: Dict[str, LeaderBoardUser]):
    board[userId]['totalPoints'] += Points[material].value
    if material in board[userId]['materials']:
        board[userId]['materials'][material]['points'] += Points[material].value
        board[userId]['materials'][material]['occurences'] += 1
    else:
        board[userId]['materials'][material] = {
            'points': Points[material].value,
            'occurences': 1
        }