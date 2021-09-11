from pydantic import BaseModel
from model.material import AllMaterials

class StatResponse(BaseModel):
    total: int
    materials: AllMaterials

class StatsResponse(BaseModel):
    week: StatResponse
    month: StatResponse
    year: StatResponse
    allTime: StatResponse
