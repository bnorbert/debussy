from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Project, Annotation
from .serializers import ProjectSerializer, UserSerializer, AnnotationSerializer
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from backend.generative_model import GenerativeModel
from django.http import HttpResponse

import base64
from io import BytesIO


class AnnotationViewSet(viewsets.ModelViewSet):
    """ This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Annotation.objects.all()
    serializer_class = AnnotationSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def my_annotations(self, request):
        user = self.request.user
        annotation_list = AnnotationSerializer(user.annotations, many=True)
        return Response(annotation_list.data)


class ProjectViewSet(viewsets.ModelViewSet):
    """ This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        projects = Project.objects.all()
        return [
            project for project in projects
            if project.owner.id == self.request.user.id or project.private == False
        ]

    @action(detail=False, methods=['get'])
    def my_projects(self, request):
        user = self.request.user
        project_list = ProjectSerializer(user.projects, many=True)
        return Response(project_list.data)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, annotations=[])

    @action(detail=False, methods=['get'])
    def generate_image(self, request):
        model = GenerativeModel()
        image_generated = model.generate()
        image_generated = image_generated.resize((200, 200))

        buffered = BytesIO()
        image_generated.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue())

        return HttpResponse(img_str, content_type="text/plain")
