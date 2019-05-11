from django.urls import path, include, re_path

from .views import IndexView, SignUp

app_name = 'game'
urlpatterns = [
  path('signup/', SignUp.as_view(success_url='/'), name='signup'),
  path('accounts/', include('django.contrib.auth.urls')),
  re_path(r'^', IndexView.as_view(), name='index'),
]