#!/bin/sh

# prod
# exec gunicorn --bind 0.0.0.0:8001 main:app -k uvicorn.workers.UvicornWorker

# dev
exec uvicorn main:app --host 0.0.0.0 --port 8000 --reload