from pydantic import BaseModel
from model.material import AllMaterials

class LeaderBoardUser(BaseModel):
    name: str;
    totalPoints: str;
    materials: AllMaterials