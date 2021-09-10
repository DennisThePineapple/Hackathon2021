from fastapi import APIRouter

router = APIRouter(prefix='/api', tags=['api'])

@router.post('/')
def suck_my_cock():
    return "Ah yeah baby that feels good"