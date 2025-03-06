from rest_framework import serializers
from .models import Task
from users.models import User
from users.serializers import RegisterSerializer


class TaskSerializer(serializers.ModelSerializer):
    assigned_user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status',
                  'assigned_user', 'created_at', 'updated_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if 'assigned_user' in representation:
            if (instance.assigned_user == None):
                representation['assigned_user'] = None
            else:
                representation['assigned_user'] = RegisterSerializer(
                    instance.assigned_user).data

        return representation
