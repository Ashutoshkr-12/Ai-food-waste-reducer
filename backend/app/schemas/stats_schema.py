from pydantic import BaseModel


class UserStatsResponse(BaseModel):
    food_saved: float
    items_added: int
    waste_reduced: float

    class Config:
        from_attributes = True