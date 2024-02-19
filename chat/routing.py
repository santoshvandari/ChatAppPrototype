from django.urls import path
from chat.consumers import Chat
ws_pattern = [
    path('ws/chat/<str:room_name>/', Chat.as_asgi()),
]
