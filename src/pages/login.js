import { userLogin, userGoogle } from "../lib/authentication.js";

export default () => {
  const container = document.createElement("div");
  const templateLoging = `
  <div class= "main-container">
    <div class= "title">
      <img src="./images/title.png" alt="leiturama" class= "title-image">
    </div>
    <div class= "flex-container">
      <form>
        <input class="email" placeholder ="e-mail" type="email" required>
        <span class="email-error"></span>
        <input class="password" placeholder="senha" minlength="6" type="password" required>
        <span class="password-error"></span>
        <button class="enter" type="submit">Entrar</button>
        <p class= "login-google">Entre com sua conta Google</p>
        <button class="google" type="submit"><img class= "google-button" src= "./images/google.png" height ="30" width="30"/></button>
        <div class="register"><a href="#register">Cadastre-se</a></div>
      </form>
    </div>
  </div>`;
  container.innerHTML = templateLoging;

  const email = container.querySelector(".email");
  const password = container.querySelector(".password");
  const loginGoogle = container.querySelector(".google");
  const messageErrorEmail = container.querySelector(".email-error");
  const messageErrorPassword = container.querySelector(".password-error");

  container.addEventListener("submit", (e) => {
    e.preventDefault();
    userLogin(email.value, password.value)
      .then(function () {
        window.location.hash = "#feed";
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (error.code == "auth/user-not-found") {
          messageErrorEmail.innerHTML = "Conta não cadastrada";
        } else if (error.code == "auth/wrong-password") {
          messageErrorPassword.innerHTML = "Senha inválida";
        }
        return errorMessage;
      });
  });

  loginGoogle.addEventListener("click", (e) => {
    e.preventDefault();
    userGoogle()
      .then(() => {
        window.location.hash = "#feed";
      })
      .catch((error) => {
        const errorMessage = error.message;
        return errorMessage;
      });
  });

  return container;
};
