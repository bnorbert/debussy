from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, Annotation


class ProjectSerializer(serializers.ModelSerializer):
	annotations = serializers.PrimaryKeyRelatedField(many=True, queryset=Annotation.objects.all())

	class Meta:
		model = Project
		fields = ['id', 'name', 'description', 'owner', 'private', 'categories', 'annotations']

class UserSerializer(serializers.ModelSerializer):
	projects = serializers.PrimaryKeyRelatedField(many=True, queryset=Project.objects.all())
	annotations = serializers.PrimaryKeyRelatedField(many=True, queryset=Annotation.objects.all())

	class Meta:
		model = User
		fields = ['id', 'username', 'email', 'projects', 'annotations']

class AnnotationSerializer(serializers.ModelSerializer):

	class Meta:
		model = Annotation
		fields = ['id', 'project', 'annotator', 'category', 'notes', 'image']