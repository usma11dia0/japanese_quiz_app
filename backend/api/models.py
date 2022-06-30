from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
import uuid


def upload_audio_question_path(instance, filename):
    ext = filename.split(".")[-1]  # ファイル拡張子を取得
    return "/".join(["audios/questions", str(instance.id) + str(".") + str(ext)])


def upload_audio_choice_path(instance, filename):
    ext = filename.split(".")[-1]
    return "/".join(
        ["audios/choices", str(instance.select_answer.id) + str(".") + str(ext)]
    )


def upload_image_question_path(instance, filename):
    ext = filename.split(".")[-1]  # ファイル拡張子を取得
    return "/".join(["images/questions", str(instance.id) + str(".") + str(ext)])


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
    question_title = models.CharField(max_length=100)  # 問題管理/解答確認用
    question_text = models.CharField(max_length=100)
    image_src = models.ImageField(
        blank=True, null=True, upload_to=upload_image_question_path
    )
    audio_src_question = models.FileField(
        blank=True,  # 開発時のみ確認のためTrue
        null=True,  # 開発時のみ確認のためTrue
        upload_to=upload_audio_question_path,
        verbose_name="音声ファイル",
        validators=[
            FileExtensionValidator(
                [
                    "mp3",
                    "pdf",
                ]
            )
        ],
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return self.question_title


class Choises(Updated):
    question_id = models.ForeignKey(
        Quizzes,
        to_field="question_id",
        related_name="select_answer",
        on_delete=models.CASCADE,
    )
    choice_text = models.CharField(max_length=100)
    is_answer = models.BooleanField(default=False)
    answer_explanation = models.CharField(blank=True, max_length=255)
    audio_src_choise = models.FileField(
        blank=True,  # 開発時のみ確認のためTrue
        null=True,  # 開発時のみ確認のためTrue
        upload_to=upload_audio_choice_path,
        verbose_name="音声ファイル",
        validators=[
            FileExtensionValidator(
                [
                    "mp3",
                    "pdf",
                ]
            )
        ],
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return self.choice_text
