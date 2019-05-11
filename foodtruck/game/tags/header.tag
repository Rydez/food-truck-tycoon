header
  .greeting
    h1 Hello { django.user ? django.user.username : 'there' }!
  .logo
    h1 Food Truckin'
  button(if="{ django.user }" onclick="{ logout }") Logout
  .login(if="{ form_showing === 'login' }")
    form(action="{ django.urls.login }" method="POST")
      input(type="hidden" name="csrfmiddlewaretoken" value="{ django.csrf }")
      input(id="username-field" name="username" type="text")
      input(id="password-field" name="password" type="password")
      button(type="submit") Login
  .signup(if="{ form_showing === 'signup' }")
    form(action="{ django.urls.signup }" method="POST")
      input(type="hidden" name="csrfmiddlewaretoken" value="{ django.csrf }")
      input(id="username-field" name="username" type="text")
      input(id="password1-field" name="password1" type="password")
      input(id="password2-field" name="password2" type="password")
      button(type="submit") Sign Up
  .form-buttons(if="{ !django.user }")
    button(
      if="{ form_showing !== 'login' }"
      onclick="{ show_form }"
      value="login"
    ) Login
    button(
      if="{ form_showing !== 'signup' }"
      onclick="{ show_form }"
      value="signup"
    ) Sign Up

  script.
    this.form_showing = null;

    this.show_form = (ev) => {
      this.update({ form_showing: ev.target.value });
    };

    this.logout = () => {
      location.href = django.urls.logout;
    };