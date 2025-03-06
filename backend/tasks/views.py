from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework import status


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.all()
        status_filter = self.request.query_params.get('status', None)
        assigned_user_filter = self.request.query_params.get(
            'assigned_user', None)

        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if assigned_user_filter:
            queryset = queryset.filter(assigned_user=assigned_user_filter)

        return queryset
