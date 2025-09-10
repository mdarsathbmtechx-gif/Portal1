from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json

from .serializers import RecruiterSerializer
from .models import RecruiterUser  # Only existing model


# -----------------------------
# Recruiter Registration
# -----------------------------
@api_view(['POST'])
def register_recruiter(request):
    serializer = RecruiterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# Recruiter Login
# -----------------------------
@csrf_exempt
def login_recruiter(request):
    """
    Endpoint: POST /api/login/
    Data: { "username", "password" }
    """
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({"message": "Login successful"})
        return JsonResponse({"error": "Invalid credentials"}, status=400)
    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)
