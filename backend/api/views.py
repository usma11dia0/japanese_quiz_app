from django.shortcuts import render
from rest_framework import status, permissions, generics, viewsets, views
from .serializers import (
    ResultPronunciationSerializer,
    UserSerializer,
    ProfileSerializer,
    QuizzesSerializer,
    ChoicesSerializer,
)
from rest_framework.response import Response
from .models import Profile, Quizzes, Choices
from django.contrib.auth.models import User
from model.predict import classify, transform_audiofile
import pydub


# CreateUserView: POSTのみ　新規ユーザー作成(username + password)
class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


# LoginUserView: GETのみ ログインユーザー情報取得
class LoginUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        response = {"message": "PUT METHOD is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


# ProfileView: GET/POST/PUT　プロフィール取得 (作成 + 更新)
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)

    def destroy(self, request, *args, **kwargs):
        response = {"message": "DELETE method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {"message": "PATCH method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


# QuizzesView：GET/POST  Quiz取得 (作成)
class QuizzesViewSet(viewsets.ModelViewSet):
    queryset = Quizzes.objects.all()
    serializer_class = QuizzesSerializer

    def destroy(self, request, *args, **kwargs):
        response = {"message": "DELETE method is not allowed"}
        return Response(response, statud=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        response = {"message": "PUT method is not allowed"}
        return Response(response, statud=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {"message": "PATCH method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


# ChoicesView: GET/POST/PUT/DELETE　Choice取得 (作成・更新・削除)
class ChoicesViewSet(viewsets.ModelViewSet):
    queryset = Choices.objects.all()
    serializer_class = ChoicesSerializer

    def partial_update(self, request, *args, **kwargs):
        response = {"message": "PATCH method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


# ResultPronunciation: POST  japanese_classificationの結果表示 DB連携無し
class ResultPronunciationView(views.APIView):
    serializer_class = ResultPronunciationSerializer

    def post(self, request, format=None):
        # if request.method == "POST"
        audio_file = request.FILES.get("file")
        sound = pydub.AudioSegment.from_wav("audio_file")
        audio_file_mp3 = sound.export("audio_file.mp3", format="mp3")
        print(audio_file)
        print(audio_file_mp3)

        # print(request)
        # print(request.FILES)
        return Response("")
