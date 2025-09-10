# jobs/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class RecruiterUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    gst = models.CharField(max_length=20, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "Recruiter User"
        verbose_name_plural = "Recruiter Users"


class JobPost(models.Model):
    # Step 1: Job Details
    about = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    openings = models.IntegerField(default=1)
    min_salary = models.FloatField(null=True, blank=True)
    max_salary = models.FloatField(null=True, blank=True)

    # Step 2: Candidate Requirement
    education = models.CharField(max_length=50)
    experience = models.CharField(max_length=50)
    gender = models.CharField(max_length=20)
    skills = models.JSONField(default=list, blank=True)
    manage_candidates = models.JSONField(default=list, blank=True)
    
    # Step 3: Company Details
    company_type = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    company_email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
