from confection import BaseModel
from pydantic import BaseModel


class Entities(BaseModel):
    text: str
    label: str
    start_char: int
    end_char: int
