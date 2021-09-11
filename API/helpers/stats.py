# Returns the name of the class in human readable format
from model.stats import StatResponse
from model.material import Points, MaterialLiteral

# Updates the stats breakdown
def update_stats_breakdown(material: MaterialLiteral, breakdown: StatResponse):
    breakdown['total'] += Points[material].value

    print(breakdown)

    if material in breakdown['materials']:
        breakdown['materials'][material]['occurences'] += 1
        breakdown['materials'][material]['points'] += Points[material].value
    else:
        breakdown['materials'][material] = {
            'occurences': 1,
            'points': Points[material].value
        }   
