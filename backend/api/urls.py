from django.urls import path, include
from rest_framework import routers
from .views import (
    CreateUserView,
    LoginUserView,
    ProfileViewSet,
    QuizzesViewSet,
    ChoicesViewSet,
)


router = routers.DefaultRouter()
router.register("profile", ProfileViewSet)
router.register("quizzes", QuizzesViewSet)
router.register("choices", ChoicesViewSet)

urlpatterns = [
    path("create/", CreateUserView.as_view(), name="create"),
    path("loginuser/", LoginUserView.as_view(), name="loginuser"),
    path("", include(router.urls)),
]
