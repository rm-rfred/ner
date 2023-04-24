#!/bin/sh

# prod
# exec gunicorn --bind 0.0.0.0:8001 main:app -k uvicorn.workers.UvicornWorker

# dev
uvicorn main:app --host 0.0.0.0 --port 80 --reload