import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import SpanishTranslations from "./translations/spa.json";
import EnglishTranslations from "./translations/eng.json";

const resources = {
    en: {
        translation: EnglishTranslations,
    },
    es: {
        translation: SpanishTranslations,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "es",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
