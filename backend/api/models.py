from tabnanny import verbose
from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
import uuid


def upload_audio_choice_path(instance, filename):
    ext = filename.split(".")[-1]
    return "/".join(
        [
            "audios/choices",
            str(instance.choise_alphabet) + str(".") + str(ext),
        ]
    )


def upload_image_choise_path(instance, filename):
    ext = filename.split(".")[-1]
    return "/".join(
        [
            "images/choices",
            str(instance.choise_alphabet) + str(".") + str(ext),
        ]
    )


# 抽象基底クラス
class Updated(models.Model):
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# 自作アプリ要件対象外
class Profile(models.Model):
    user_profile = models.OneToOneField(
        User, related_name="user_profile", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.user_profile.username


class Quizzes(Updated):
    question_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    question_text = models.CharField(max_length=100)  # 問題文表記用
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Quizzes"
        ordering = ["created_at"]

    def __str__(self):
        return self.question_text


class Choises(Updated):
    quiz = models.ForeignKey(
        Quizzes,
        to_field="question_id",
        related_name="choises",
        on_delete=models.CASCADE,
    )
    choise_text = models.CharField(max_length=100)
    choise_alphabet = models.CharField(max_length=100)  # 保存file名用
    answer_explanation = models.CharField(blank=True, max_length=255)
    image_choise_src = models.ImageField(
        blank=False,
        null=True,
        upload_to=upload_image_choise_path,
        verbose_name="選択肢画像ファイル",
    )
    audio_choise_src = models.FileField(
        blank=False,
        null=True,
        upload_to=upload_audio_choice_path,
        verbose_name="選択肢音声ファイル",
        validators=[
            FileExtensionValidator(
                [
                    "mp3",
                ]
            )
        ],
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Choises"
        ordering = ["created_at"]

    def __str__(self):
        return self.choise_text
