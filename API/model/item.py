from enum import Enum
from pydantic import BaseModel
from model.material import MaterialLiteral

# An item
class Item(BaseModel):
    userId: str
    username: str
    points: int
    material: MaterialLiteral