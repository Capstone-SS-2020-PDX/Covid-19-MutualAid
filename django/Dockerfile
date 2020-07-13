FROM gcr.io/google-appengine/python

RUN apt-get update && apt-get install -y binutils libproj-dev gdal-bin

# Set environment variables
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

# Install dependencies.
RUN pip3 install -r /requirements.txt

# Set work directory.
RUN mkdir /code
WORKDIR /code

# Copy project code.
COPY . /code/

EXPOSE 8080

CMD python3 manage.py runserver 0.0.0.0:8080