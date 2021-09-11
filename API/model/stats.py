from pydantic import BaseModel
from model.material import AllMaterials

class StatResponse(BaseModel):
    total: int
    materials: AllMaterials

class StatsResponse(BaseModel):
    month: StatResponse
    year: StatResponse
    all_time: StatResponse
