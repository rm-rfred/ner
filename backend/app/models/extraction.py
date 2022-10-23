from confection import BaseModel
from pydantic import BaseModel


class Extraction(BaseModel):
    first_index: int
    last_index: int
    name: str
    content: str
