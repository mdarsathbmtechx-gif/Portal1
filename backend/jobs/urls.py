from django.urls import path
from .views import register_recruiter, login_recruiter  # Removed JobViewSet

urlpatterns = [
    path('register/', register_recruiter, name='register'),
    path('login/', login_recruiter, name='login'),
]
