FROM python:3.6

EXPOSE 5000

WORKDIR /app
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
ENV FLASK_DEBUG=1
COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY app.py /app
CMD ["flask", "run"]
