import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      logout: "Logout",
      cart: "Cart",
      ru: "Russian",
      en: "English",
      basket: {
        title: "Basket"
      }
    },
  },
  ru: {
    translation: {
      login: "Войти",
      logout: "Выйти",
      cart: "Корзина",
      ru: "Русский",
      en: "Английский",
      basket: {
        title: "Корзина"
      }
    },
  },
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
