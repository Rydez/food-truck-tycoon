header
  .greeting
    h1 Hello { django.user ? django.user.username : 'there' }!
  .logo
    h1 Food Truckin'
  button(if="{ django.user }" onclick="{ logout }") Logout
  .form-buttons(if="{ !django.user }")
    button(onclick="{ show_login_modal }") Login
    button(onclick="{ show_signup_modal }") Sign Up

  modal(ref="signup_modal")
    .title Sign Up
    .content
      form(action="{ django.urls.signup }" method="POST")
        input(type="hidden" name="csrfmiddlewaretoken" value="{ django.csrf }")
        label Username
          input(id="signup-username" name="username" type="text")
        label Password
          input(id="signup-password1" name="password1" type="password")
        label Confirm Password
          input(id="signup-password2" name="password2" type="password")
        .buttons
          button.cancel(type="button") Cancel
          button(type="submit") Sign Up

  modal(ref="login_modal")
    .title Login
    .content
      form(action="{ django.urls.login }" method="POST")
        input(type="hidden" name="csrfmiddlewaretoken" value="{ django.csrf }")
        label Username
          input(id="login-username" name="username" type="text")
        label Password
          input(id="login-password" name="password" type="password")
        .buttons
          button.cancel(type="button") Cancel
          button(type="submit") Login

  script.
    this.show_login_modal = () => {
      this.refs.login_modal.show();
    };

    this.show_signup_modal = () => {
      this.refs.signup_modal.show();
    };

    this.logout = () => {
      location.href = django.urls.logout;
    };