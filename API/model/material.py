from enum import Enum
from typing import Literal, Optional
from pydantic import BaseModel

MaterialLiteral = Literal['plastic', 'paper', 'metal', 'cardboard', 'organic', 'glass', 'waste']

# Points for a given class
class Points(int, Enum):
    plastic = 100
    paper = 100
    metal = 100
    cardboard = 100
    organic = 100
    glass = 100
    waste = 50

    def __str__(self):
        return str(self.value)

# The material of an item
class Material(BaseModel):
    points: int
    occurences: int

class AllMaterials(BaseModel):
    plastic: Optional[Material] = None
    paper: Optional[Material] = None
    metal: Optional[Material] = None
    cardboard: Optional[Material] = None
    organic: Optional[Material] = None
    glass: Optional[Material] = None
    waste: Optional[Material] = None