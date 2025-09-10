# populate_db.py
import os
import django

# 1️⃣ Set Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "jobportal.settings")  # <-- your project folder

# 2️⃣ Setup Django
django.setup()

# 3️⃣ Import your models
from users.models import (
    Users,
    SeekerProfiles,
    SeekerDetails,
    Skills,
    SeekerSkills,
    SeekerExperience,
    RecruiterProfiles,
    RecruiterDetails,
    Addresses,
    Jobs,
    Applications,
    Roles,
    Plans,
    Subscriptions,
    Permissions
)

# 4️⃣ Populate roles
roles = ["seeker", "recruiter", "admin"]
for role_name in roles:
    Roles.objects.get_or_create(role_name=role_name)

# 5️⃣ Create test users
seeker_user, _ = Users.objects.get_or_create(
    name="John Seeker",
    email="john.seeker@example.com",
    defaults={
        "password": "hashed_password_here",
        "role_id": Roles.objects.get(role_name="seeker").id,
        "email_otp": "123456",
        "email_verified": True
    }
)

recruiter_user, _ = Users.objects.get_or_create(
    name="Jane Recruiter",
    email="jane.recruiter@example.com",
    defaults={
        "password": "hashed_password_here",
        "role_id": Roles.objects.get(role_name="recruiter").id,
        "email_otp": "654321",
        "email_verified": True
    }
)

# 6️⃣ Create Seeker Profiles
seeker_profile, _ = SeekerProfiles.objects.get_or_create(
    user_id=seeker_user.id,
    defaults={
        "first_name": "John",
        "last_name": "Seeker",
        "phone": "1234567890"
    }
)

# 7️⃣ Create Seeker Details
SeekerDetails.objects.get_or_create(
    seeker_id=seeker_profile.id,
    defaults={
        "dob": "1990-01-01",
        "gender": "male",
        "bio": "Experienced software developer",
        "profile_image_url": "",
        "background_image_url": "",
        "resume_url": "",
        "linkedin_url": "",
        "portfolio_url": ""
    }
)

# 8️⃣ Create Skills
skills_list = ["Python", "Django", "React", "MongoDB"]
for skill in skills_list:
    Skills.objects.get_or_create(skill_name=skill)

# 9️⃣ Assign skills to seeker
for skill_name in skills_list:
    skill = Skills.objects.get(skill_name=skill_name)
    SeekerSkills.objects.get_or_create(
        seeker_id=seeker_profile.id,
        skill_id=skill.id,
        defaults={
            "proficiency": "intermediate",
            "years_of_experience": 2
        }
    )

# 🔹 Similarly, create recruiter profile
recruiter_profile, _ = RecruiterProfiles.objects.get_or_create(
    user_id=recruiter_user.id,
    defaults={
        "company_name": "Tech Corp",
        "phone": "0987654321",
        "gst_number": "GST12345"
    }
)

RecruiterDetails.objects.get_or_create(
    recruiter_id=recruiter_profile.id,
    defaults={
        "services": "Software development",
        "website_url": "https://techcorp.com",
        "linkedin_url": "",
        "other_url": "",
        "logo_url": "",
        "banner_url": ""
    }
)

# 🔹 Create a job
job, _ = Jobs.objects.get_or_create(
    recruiter_id=recruiter_profile.id,
    title="Backend Developer",
    defaults={
        "summary": "Work on Django backend",
        "responsibilities": "Develop APIs",
        "requirements": "Django, Python",
        "benefits": "Health insurance",
        "salary_min": 50000,
        "salary_max": 70000,
        "location": "Remote",
        "job_type": "full-time"
    }
)

# 🔹 Create application
Applications.objects.get_or_create(
    job_id=job.id,
    seeker_id=seeker_profile.id,
    defaults={
        "status": "applied"
    }
)

# 🔹 Create Plans
plans_data = [
    {"plan_name": "Free", "description": "Basic plan", "price": 0, "duration_days": 30, "job_post_limit": 1},
    {"plan_name": "Pro", "description": "Pro plan", "price": 99.99, "duration_days": 90, "job_post_limit": 10}
]
for plan in plans_data:
    Plans.objects.get_or_create(**plan)

# 🔹 Create a subscription for recruiter
Subscriptions.objects.get_or_create(
    recruiter_id=recruiter_profile.id,
    plan_id=Plans.objects.get(plan_name="Free").id,
    defaults={
        "start_date": "2025-09-01",
        "end_date": "2025-09-30",
        "is_active": True
    }
)

print("✅ Database populated successfully!")
