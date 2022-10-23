from fastapi import APIRouter
import spacy

from app.models.output import Output
from app.models.input import Input


router = APIRouter()


@router.post("/extraction", status_code=200, response_model=Output)
def extraction(input: Input):
    en_core_web_lg = spacy.load("en_core_web_lg")

    document = en_core_web_lg(input.sentence)
    extractions = []
    for entity in document.ents:
        extraction = {}
        extraction["first_index"] = entity.start_char
        extraction["last_index"] = entity.end_char
        extraction["name"] = entity.label_
        extraction["content"] = entity.text
        extractions.append(extractions)

    return {"extraction": extraction}
