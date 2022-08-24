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
import tempfile
import librosa.display
import matplotlib
import matplotlib.pyplot as plt
import os

#バックエンドを指定
matplotlib.use('Agg')

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
        # requestからwavファイル取得
        audio_file_wav = request.FILES["file"]

        # 一時保管ディレクトリ
        with tempfile.TemporaryDirectory() as tmpdirname:
            # wavファイル→mp3ファイルへ変換してTemporaryDirectoryへ一時保存
            audio_pydub = pydub.AudioSegment.from_file(audio_file_wav)
            target_audio_path = f"{tmpdirname}/target_audio_file.mp3"
            audio_pydub.export(target_audio_path, format="mp3")

            # mp3ファイル→メルスペクトログラム変換
            feature_melspec_db, sample_rate = transform_audiofile(target_audio_path)

            # メルスペクトログラム画像を生成しTemporaryDirectoryへ一時保存
            librosa.display.specshow(feature_melspec_db, sr=sample_rate)
            plt.subplots_adjust(left=0, right=1, bottom=0, top=1)  # 余白を調整
            target_spec_path = f"{tmpdirname}/target_spec_img.png"
            plt.savefig(target_spec_path)
            plt.close()

            # 推論実行
            # print(os.listdir(tmpdirname))
            y, y_proba = classify(target_spec_path)
            print(y)
            print(y_proba)
        return Response("")
