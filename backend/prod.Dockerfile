FROM python:3.10

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONPATH .

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1 

RUN python3.10 -m pip install --no-cache-dir --upgrade pip==23.1.1

COPY ./requirements.txt /requirements.txt

RUN python3.10 -m pip install --no-cache-dir -r /requirements.txt && \
    python3.10 -m spacy download en_core_web_lg

ENV API_ENV PROD

COPY ./prod.entrypoint.sh /prod.entrypoint.sh

CMD [ "/prod.entrypoint.sh" ]