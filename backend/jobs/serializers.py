from rest_framework import serializers
from .models import RecruiterUser  # Only import existing model

# Recruiter registration serializer
class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecruiterUser
        fields = ['username', 'password', 'phone', 'gst']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = RecruiterUser(
            username=validated_data['username'],
            phone=validated_data['phone'],
            gst=validated_data['gst']
        )
        user.set_password(validated_data['password'])  # Hash password
        user.save()
        return user
