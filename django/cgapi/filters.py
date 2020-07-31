from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance
from .models import Posting
from django_filters import rest_framework as filters


class PostingFilter(filters.FilterSet):
    radius = filters.CharFilter(method='radius_filter')

    class Meta:
        model = Posting
        fields = ['radius',]

    def radius_filter(self, queryset, name, value):
        """Filter postings in a radius about a given longitude/latitude"""
        lng = self.request.GET.get('longitude')
        lat = self.request.GET.get('latitude')
        rad = self.request.GET.get('radius')
        if None not in (lng, lat, rad):
            radius = int(rad)
            point = Point(float(lng), float(lat))
            return queryset.filter(location__distance_lt=(point, Distance(mi=radius)))
        return queryset.none()

