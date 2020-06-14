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
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

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

        response = HttpResponse(content_type="image/png")

        image_generated.save(response, 'JPEG')

        return response


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def current_user_info(self, request):
        current_user = request.user
        return Response(UserSerializer(current_user).data)
