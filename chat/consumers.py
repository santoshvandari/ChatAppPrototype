# Using Sync Method 
# import json

# from asgiref.sync import async_to_sync
# from channels.generic.websocket import WebsocketConsumer


# class Chat(WebsocketConsumer):
#     def connect(self):
#         self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
#         self.room_group_name = f"chat_{self.room_name}"
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name, self.channel_name
#         )
#         self.accept()
#         print("Connection Accepted")

#     def disconnect(self, close_code):
#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name, self.channel_name
#         )



#     def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json["message"]
#         print("Connection Received")
#         print(message)
#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name, {"type": "chat.message", "message": message}
#         )

#     def chat_message(self, event):
#         message = event["message"]
#         self.send(text_data=json.dumps({"message": message}))
#         print("Message Broadcasted")


# Using Async Method
import json
from datetime import datetime
from channels.generic.websocket import AsyncWebsocketConsumer

class Chat(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        
        # Generate a unique user ID for this connection
        import uuid
        self.user_id = str(uuid.uuid4())[:8]
        
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        
        # Send join notification to the room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "user_join",
                "user_id": self.user_id,
                "message": f"User {self.user_id} joined the room"
            }
        )

    async def disconnect(self, close_code):
        # Send leave notification to the room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "user_leave",
                "user_id": self.user_id,
                "message": f"User {self.user_id} left the room"
            }
        )
        
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json.get("message", "").strip()
            
            if message:  # Only send non-empty messages
                timestamp = datetime.now().strftime("%H:%M")
                
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "message": message,
                        "user_id": self.user_id,
                        "timestamp": timestamp
                    }
                )
        except json.JSONDecodeError:
            # Handle invalid JSON
            pass

    async def chat_message(self, event):
        """Send chat message to WebSocket"""
        await self.send(text_data=json.dumps({
            "type": "message",
            "message": event["message"],
            "user_id": event.get("user_id"),
            "timestamp": event.get("timestamp")
        }))
    
    async def user_join(self, event):
        """Send user join notification to WebSocket"""
        await self.send(text_data=json.dumps({
            "type": "system",
            "message": event["message"],
            "user_id": event.get("user_id")
        }))
    
    async def user_leave(self, event):
        """Send user leave notification to WebSocket"""
        await self.send(text_data=json.dumps({
            "type": "system",
            "message": event["message"],
            "user_id": event.get("user_id")
        }))