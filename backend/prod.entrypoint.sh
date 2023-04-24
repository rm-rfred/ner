#!/bin/sh

# PROD
gunicorn app.main:app --workers 8 --worker-class uvicorn.workers