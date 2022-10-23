from pydantic import BaseModel


class Input(BaseModel):
    sentence: str
