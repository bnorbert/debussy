from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=50)
    owner = models.ForeignKey(User, related_name='projects', on_delete=models.CASCADE, default=1)
    private = models.BooleanField()
    categories = models.CharField(max_length=200)


class Annotation(models.Model):
    project = models.ForeignKey(Project, related_name='annotations', on_delete=models.CASCADE)
    annotator = models.ForeignKey(User, related_name='annotations', on_delete=models.CASCADE)
    category = models.CharField(max_length=20)
    image = models.ImageField(default='default.jpg', upload_to='annotation_images')
    notes = models.CharField(max_length=100)
