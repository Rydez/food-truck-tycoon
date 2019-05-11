from django.contrib.auth.forms import UserCreationForm
from game.models import Player

class PlayerCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = Player