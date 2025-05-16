import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      auth: {
        title: "Authorization",
        login: "Login",
        password: "Password",
        loginPlaceholder: "Enter your login",
        passwordPlaceholder: "Enter your password",
        loginBtn: "Login",
        registerBtn: "Register"
      },
      reg: {
        title: "Registration",
        login: "Login",
        password: "Password",
        loginPlaceholder: "Enter your login",
        passwordPlaceholder: "Enter your password",
        registerBtn: "Register",
        backBtn: "Back to login"
      },
      login: "Login",
      logout: "Logout",
      cart: "Cart",
      ru: "Russian",
      en: "English",
      notFound: {
        title: "Oops! This page doesn't exist.",
        description: "You may have typed the address incorrectly or the page has been moved.",
        button: "Go to Home"
      },
      basket: {
        title: "Basket"
      },
    }
  },
  ru: {
    translation: {
      auth: {
        title: "Авторизация",
        login: "Логин",
        password: "Пароль",
        loginPlaceholder: "Укажите логин",
        passwordPlaceholder: "Укажите пароль",
        loginBtn: "Войти",
        registerBtn: "Зарегистрироваться"
      },
      reg: {
        title: "Регистрация",
        login: "Логин",
        password: "Пароль",
        loginPlaceholder: "Укажите логин",
        passwordPlaceholder: "Укажите пароль",
        registerBtn: "Зарегистрироваться",
        backBtn: "Назад ко входу"
      },
      login: "Войти",
      logout: "Выйти",
      cart: "Корзина",
      ru: "Русский",
      en: "Английский",
      notFound: {
        title: "Упс! Такой страницы не существует.",
        description: "Возможно, вы ввели неправильный адрес или страница была удалена.",
        button: "На главную"
      },
      basket: {
        title: "Корзина"
      },
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
