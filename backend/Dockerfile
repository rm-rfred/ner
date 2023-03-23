FROM python:3.9

RUN addgroup --system app && adduser --system --group app

WORKDIR /app/

RUN python -m pip install --upgrade pip==23.0.1

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1
ENV ENVIRONMENT prod
ENV TESTING 0

COPY ./app/requirements.txt /app/

RUN pip install -r requirements.txt && \
    python -m spacy download en_core_web_lg

COPY ./app /app
RUN chmod +x entrypoint.sh

ENV PYTHONPATH=/app

RUN chown -R app:app $HOME

USER app

CMD ["./entrypoint.sh"]