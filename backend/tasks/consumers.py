from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync


class TaskConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            "websocket_clients",
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "websocket_clients",
            self.channel_name
        )

    def receive(self, text_data):
        async_to_sync(self.channel_layer.group_send)(
            "websocket_clients",
            {
                "type": "broadcast_message",
                "message": text_data
            }
        )

    def broadcast_message(self, event):
        self.send(text_data=json.dumps({
            "message": event["message"]
        }))
