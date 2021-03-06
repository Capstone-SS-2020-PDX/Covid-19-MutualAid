"""cgproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from cgapi import views as cgapi_views

router = routers.DefaultRouter()
router.register(r'communities', cgapi_views.CommunityViewSet)
router.register(r'postings', cgapi_views.PostingViewSet)
router.register(r'profiles', cgapi_views.UserProfileViewSet)
router.register(r'auth', cgapi_views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('token/', cgapi_views.CustomAuthToken.as_view()),
    path('register/', cgapi_views.register_user),
    path('check-username/', cgapi_views.username_available),
]
