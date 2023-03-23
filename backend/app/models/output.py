from typing import List
from pydantic import BaseModel

from models.extraction import Extraction


class Output(BaseModel):
    extractions: List[Extraction]
