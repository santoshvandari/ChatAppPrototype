from django.urls import path
from chat import views
urlpatterns = [
    path('',views.index,name="index"),
    path("chat/<str:room_name>/", views.room, name="room"),
]
