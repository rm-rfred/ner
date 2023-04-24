# FROM python:3.9

# RUN addgroup --system app && adduser --system --group app

# WORKDIR /app

# RUN python -m pip install --upgrade pip==23.1.1

# ENV PYTHONDONTWRITEBYTECODE 1

# ENV PYTHONUNBUFFERED 1
# ENV ENVIRONMENT prod
# ENV TESTING 0

# COPY ./app/requirements.txt /app/

# RUN pip install -r requirements.txt && \
#     python -m spacy download en_core_web_lg

# COPY ./app /app
# RUN chmod +x entrypoint.sh

# ENV PYTHONPATH=/app

# RUN chown -R app:app $HOME

# USER app

# CMD ["./entrypoint.sh"]

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONPATH .

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1 

# install python 3.7.10 (or newer)
RUN apt-get update && \
    apt-get -y install curl \
    # apt-get install --no-install-recommends -y build-essential software-properties-common && \
    apt-get install --no-install-recommends -y build-essential software-properties-common && \
    # add-apt-repository -y ppa:deadsnakes/ppa && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get install python3.9 python3.9-dev python3.9-distutils && \
    apt-get install python3-pip
# apt clean && rm -rf /var/lib/apt/lists/*

# Register the version in alternatives (and set higher priority to 3.7)
# RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.6 1
# RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 2

# RUN curl -s https://bootstrap.pypa.io/get-pip.py -o get-pip.py && \
#     python3 get-pip.py --force-reinstall && \
#     rm get-pip.py

RUN python3.9 -m pip install --no-cache-dir --upgrade pip==23.1.1

COPY ./requirements.txt /requirements.txt

RUN python3.9 -m pip install --no-cache-dir -r /requirements.txt \
    && python3.9 -m spacy download en_core_web_lg \
    && apt-get clean autoclean \
    && apt-get autoremove --yes \
    && rm -rf /var/lib/apt /var/lib/dpkg /var/lib/cache /var/lib/log

ENV API_ENV PROD

COPY ./entrypoint.sh /entrypoint.sh

CMD [ "/entrypoint.sh" ]






# RUN pip install -r requirements.txt && \
#     python3.9 -m spacy download en_core_web_lg

# ENV API_ENV DEV

# COPY ./app /app

# ENV PYTHONPATH=/app

# # RUN chown -R app:app $HOME

# # USER app

# CMD [ "python3.9", "main.py" ]
