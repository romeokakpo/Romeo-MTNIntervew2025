from rest_framework import serializers
from .models import Task
from users.models import User


class TaskSerializer(serializers.ModelSerializer):
    assigned_user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status',
                  'assigned_user', 'created_at', 'updated_at']
