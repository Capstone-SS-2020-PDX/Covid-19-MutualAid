"""
Django settings for cgproj project.

Generated by 'django-admin startproject' using Django 3.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["cellular-virtue-277000.uc.r.appspot.com", 'localhost', '192.168.*', '10.*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'cgapi',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'cgproj.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cgproj.wsgi.application'

#This is so testing can be done. In the future we'll want to limit this to
#whatever URL we use to host our browser-based service (if any).
CORS_ORIGIN_ALLOW_ALL = True

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
if os.getenv('GAE_APPLICATION', None):
    DATABASES = {
        'default': {
                'ENGINE': 'django.db.backends.postgresql',
                'HOST': '/cloudsql/cellular-virtue-277000:us-central1:cgtest',
                'USER': 'postgres',
                'NAME': 'postgres',
                'PASSWORD': os.getenv('POSTGRES_DB_PASSWORD'),
                }
        }
else:
    DATABASES = {
        'default': {
                'ENGINE': 'django.db.backends.postgresql',
                'HOST': '127.0.0.1',
                'PORT': '5432',
                'USER': 'postgres',
                'NAME': 'postgres',
                'PASSWORD': 'testpassword',
                }
        }
# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

#This lets us define our own fields for our user while still using the
#built-in auth.
AUTH_PROFILE_MODULE = "cgapi.UserProfile"
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = 'static'


if os.getenv('GAE_APPLICATION', None):
    DEFAULT_FILE_STORAGE = 'gcloud.GoogleCloudMediaFileStorage'
    
    GS_PROJECT_ID = 'cellular-virtue-277000'
    GS_MEDIA_BUCKET_NAME = 'cgapi-upload-media'
    

    MEDIA_URL = 'https://storage.googleapis.com/{}/'.format(GS_MEDIA_BUCKET_NAME)
    MEDIA_ROOT = "media/"
    
    UPLOAD_ROOT = 'media/uploads/'

else:
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = smtp.sendgrid.net
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_HOST_USER = os.getenv('EMAIL_USER')
EMAIL_HOST_PASSWORD = os.getenc('EMAIL_PASSWORD')
