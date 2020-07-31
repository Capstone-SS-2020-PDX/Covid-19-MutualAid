from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance
from django_filters import rest_framework as filters

class PostingFilterFilter(filters.FilterSet):
    radius = filters.CharFilter(method='radius_filter')

    class Meta:
        model = Posting
        fields = ['radius',]

    def radius_filter(self, queryset, name, value):
        lng = self.request.GET.get('longitude')
        lat = self.request.GET.get('latitude')
        rad = self.request.GET.get('radius')
        radius = int(rad)
        point = Point(float(lng), float(lat))
        return queryset.filter(location__distance_lt=(point, Distance(mi=radius)))

