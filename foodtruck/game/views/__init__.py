
from .truck import *
from .player import *
from .career import *
from .location import *
from .resource import *
from .equipment import *
from .menu_item import *
from .career_resource import *
from .career_menu_item import *
from .career_equipment import *
from .menu_item_resource import *
from .menu_item_equipment import *

from django.views.generic import TemplateView, CreateView
from django.contrib.auth.forms import AuthenticationForm
from ..forms import PlayerCreationForm

class IndexView(TemplateView):
  template_name = 'game/index.pug'

  def get_context_data(self, **kwargs):
    context = super(IndexView, self).get_context_data(**kwargs)
    context['login_form'] = AuthenticationForm
    context['signup_form'] = PlayerCreationForm
    return context

class SignUp(CreateView):
  form_class = PlayerCreationForm