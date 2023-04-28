from fastapi import APIRouter, File, UploadFile
import spacy

from models.output import Output
from models.input import Input


router = APIRouter()

en_core_web_lg = spacy.load("en_core_web_lg")
en_core_web_lg.max_length = 2000000


@router.get("/", status_code=200)
def hello_world():
    return {
        "message": "Hello World"
    }


@router.post("/text", status_code=200, response_model=Output)
def extract_entities_from_text(input: Input):
    document = en_core_web_lg(input.text)

    entities = []
    for entity in document.ents:
        entities.append({
            "text": entity.text,
            "label": entity.label_,
            "start_char": entity.start_char,
            "end_char": entity.end_char
        })

    return {"entities": entities}


@router.post("/file")
async def extract_entities_from_file(file: UploadFile = File(...)):
    contents = await file.read()

    document = en_core_web_lg(contents.decode("ISO-8859-1"))

    entities = []

    for entity in document.ents:
        entities.append({
            "text": entity.text,
            "label": entity.label_,
            "start_char": entity.start_char,
            "end_char": entity.end_char
        })

    return {"entities": entities}
