from rest_framework import serializers
from .models import Quizzes, Choices
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class QuizzesSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Quizzes
        fields = ["question_id", "question_text", "created_at", "updated_at"]


class ChoicesSerializer(serializers.ModelSerializer):
    quiz_question_text = serializers.ReadOnlyField(
        source="quiz.question_text", read_only=True
    )
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Choices
        fields = [
            "quiz",
            "quiz_question_text",
            "choice_text",
            "choice_alphabet",
            "answer_explanation",
            "image_choice_src",
            "audio_choice_src",
            "created_at",
            "updated_at",
        ]
