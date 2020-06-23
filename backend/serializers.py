from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, Annotation
from django.core.files.base import ContentFile
import base64
import uuid
import pdb
from PIL import Image
from io import BytesIO


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


class Base64ImageFieldSerializer(serializers.ImageField):
    def to_representation(self, data):
        try:
            img = Image.open(data.url[1:])
            buffered = BytesIO()
            img.save(buffered, format="JPEG")
            img_str = base64.b64encode(buffered.getvalue())
        except Exception as e:
            print(e)
            img_str = ""

        return img_str

    def to_internal_value(self, data):

        # base64 encoded image - decode
        format, imgstr = data.split(';base64,')  # format ~= data:image/X,
        ext = format.split('/')[-1]  # guess file extension

        filename = f"{str(uuid.uuid4())}.{ext}"

        data = ContentFile(base64.b64decode(imgstr), name=filename)

        return super(Base64ImageFieldSerializer, self).to_internal_value(data)


class AnnotationSerializer(serializers.ModelSerializer):
    image = Base64ImageFieldSerializer()

    class Meta:
        model = Annotation
        fields = ['id', 'project', 'annotator', 'category', 'notes', 'image']
