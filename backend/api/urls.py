from django.urls import path, include
from rest_framework import routers
from .views import (
    CreateUserView,
    LoginUserView,
    QuizzesViewSet,
    ChoicesViewSet,
    ResultPronunciationView,
)

router = routers.DefaultRouter()
router.register("quizzes", QuizzesViewSet)
router.register("choices", ChoicesViewSet)

urlpatterns = [
    path("create/", CreateUserView.as_view(), name="create"),
    path("loginuser/", LoginUserView.as_view(), name="loginuser"),
    path("result/", ResultPronunciationView.as_view(), name="result"),
    path("", include(router.urls)),
]
