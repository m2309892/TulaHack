FROM --platform=linux/amd64 python:3.11-slim

WORKDIR /app

ENV POETRY_VERSION=1.6.1
ENV POETRY_VIRTUALENVS_IN_PROJECT=true
ENV POETRY_NO_INTERACTION=1

RUN pip install poetry

COPY poetry.lock pyproject.toml /app/

RUN poetry install

COPY . .

CMD ["python3", "__main__.py"]