import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import uk from './uk.json';

const resources = {
  en: {translation: en},
  uk: {translation: uk},
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'uk',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
