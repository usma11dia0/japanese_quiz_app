# Generated by Django 3.1 on 2022-06-29 10:00

import api.models
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Quizzes',
            fields=[
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('question_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('question_title', models.CharField(max_length=100)),
                ('question_text', models.CharField(max_length=100)),
                ('image_src', models.ImageField(blank=True, null=True, upload_to=api.models.upload_audio_question_path)),
                ('audio_src_question', models.FileField(blank=True, null=True, upload_to=api.models.upload_audio_question_path, validators=[django.core.validators.FileExtensionValidator(['mp3', 'pdf'])], verbose_name='音声ファイル')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Choises',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('choice_text', models.CharField(max_length=100)),
                ('is_answer', models.BooleanField(default=False)),
                ('answer_explanation', models.CharField(blank=True, max_length=255)),
                ('audio_src_choise', models.FileField(blank=True, null=True, upload_to=api.models.upload_audio_choice_path, validators=[django.core.validators.FileExtensionValidator(['mp3', 'pdf'])], verbose_name='音声ファイル')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('question_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='select_answer', to='api.quizzes')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]
