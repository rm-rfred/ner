from typing import List
from pydantic import BaseModel

from app.models.extraction import Extraction


class Output(BaseModel):
    extractions: List[Extraction]
