# Generated by Django 3.1 on 2022-07-06 09:57

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
                ('question_text', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Quizzes',
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
            name='Choices',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('choice_text', models.CharField(max_length=100)),
                ('choice_alphabet', models.CharField(max_length=100)),
                ('answer_explanation', models.CharField(blank=True, max_length=255)),
                ('image_choice_src', models.ImageField(null=True, upload_to=api.models.upload_image_choice_path, verbose_name='選択肢画像ファイル')),
                ('audio_choice_src', models.FileField(null=True, upload_to=api.models.upload_audio_choice_path, validators=[django.core.validators.FileExtensionValidator(['mp3'])], verbose_name='選択肢音声ファイル')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='api.quizzes')),
            ],
            options={
                'verbose_name': 'Choices',
                'ordering': ['created_at'],
            },
        ),
    ]
