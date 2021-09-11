# Returns the name of the class in human readable format
from typing import Dict
from model.material import Points, MaterialLiteral, AllMaterials

CLASS_MAP = {
    0: "plastic", 
    1: "paper",
    2: "metal",
    3: "cardboard",
    4: "organic",
    5: "glass",
    6: "waste"
}

# Returns the material name from the tensor class map
def get_class_name(class_num: int):
    return CLASS_MAP[class_num]

# Returns an array from the model predictions containing the class name
def get_class_array(tensor_array):
    class_array = tensor_array[:5] + [CLASS_MAP[tensor_array[5]]]
    return class_array

# Updates the material breakdown
def update_material_breakdown(material: MaterialLiteral, breakdown: AllMaterials):
    if material in breakdown:
        breakdown[material]['occurences'] += 1
        breakdown[material]['points'] += Points[material].value
    else:
        breakdown[material] = {
            'occurences': 1,
            'points': Points[material].value
        }   
