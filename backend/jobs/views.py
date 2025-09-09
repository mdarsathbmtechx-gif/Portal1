from django.shortcuts import render
from django.views.generic import View
from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer
from django.http import HttpResponse
from django.conf import settings
import os

# Job API
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

# React frontend
class FrontendAppView(View):
    def get(self, request, *args, **kwargs):
        index_file = os.path.join(settings.BASE_DIR, '../client/dist/index.html')
        if os.path.exists(index_file):
            with open(index_file, encoding='utf-8') as f:
                return HttpResponse(f.read())
        return HttpResponse(
            "index.html not found! Did you build the React app?", status=501
        )
