from pydantic import BaseModel


class UserStatsResponse(BaseModel):
    food_saved: float
    recipes_cooked: int
    waste_reduced_percentage: float

    class Config:
        from_attributes = True