from typing import List
from pydantic import BaseModel
from model.material import AllMaterials, MaterialLiteral

class Bounding(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    conf: float
    material: MaterialLiteral

class SubmitResponse(BaseModel):
    total: int
    breakdown: AllMaterials
    boundings: List[Bounding]
