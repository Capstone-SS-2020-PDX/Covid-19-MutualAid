FROM python:3.8-slim-buster

RUN apt-get -y update && apt-get install -y binutils libproj-dev gdal-bin libpq-dev
RUN export PATH=$PATH:/usr/lib
RUN export PATH=$PATH:/usr/local/lib
RUN export LD_LIBRARY_PATH=/usr/local/lib
RUN echo `python3 --version`

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV DJANGO_KEY ${DJANGO_KEY}
ENV POSTGRES_PASSWORD ${POSTGRES_PASSWORD}
ENV DB_IP_ADDR ${DB_IP_ADDR}
ENV GS_MEDIA_BUCKET_NAME ${GS_MEDIA_BUCKET_NAME}
ENV SENDGRID_API_KEY ${SENDGRID_API_KEY}

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