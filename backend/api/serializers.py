from rest_framework import serializers
from .models import Profile, Quizzes, Choises
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "user_profile"]
        extra_kwargs = {
            "user_profile": {"read_only": True}
        }  # Userモデルと一対一関係で自動作成されるため、user_profileはread_only指定


class QuizzesSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Quizzes
        fields = ["question_id", "question_text", "created_at", "updated_at"]


class ChoisesSerializer(serializers.ModelSerializer):
    quiz_question_text = serializers.ReadOnlyField(
        source="quiz.question_text", read_only=True
    )
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Choises
        fields = [
            "quiz",
            "quiz_question_text",
            "choise_text",
            "choise_alphabet",
            "answer_explanation",
            "image_choise_src",
            "audio_choise_src",
            "created_at",
            "updated_at",
        ]
