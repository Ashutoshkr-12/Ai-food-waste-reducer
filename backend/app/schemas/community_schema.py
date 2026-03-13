from pydantic import BaseModel


class CommunityRecipeCreate(BaseModel):
    title: str
    description: str
    ingredients: str
    steps: str


class CommunityRecipeResponse(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        from_attributes = True