# Makefile for FastAPI with pipenv

run:
	pipenv run uvicorn main:app --reload

shell:
	pipenv shell

install:
	pipenv install

install-dev:
	pipenv install --dev

lint:
	pipenv run black .

freeze:
	pipenv lock --requirements > requirements.txt

clean:
	find . -type d -name "__pycache__" -exec rm -r {} +
