from typing import List
from pydantic import BaseModel

from .entities import Entities


class Output(BaseModel):
    entities: List[Entities]
