from django.urls import path
from . import views


urlpatterns = [
    path("", views.cafe_list, name="cafe-list"),
]