import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// Importing translation files

import translationEN from './locales/en/translation.json'
import translationDE from './locales/de/translation.json'
import translationIT from './locales/it/translation.json'
import translationSV from './locales/sv/translation.json'

//Creating object with the variables of imported translation files
const resources = {
    en: {
        translation: translationEN,
    },
    de: {
        translation: translationDE,
    },
    it: {
        translation: translationIT,
    },
    sv: {
        translation: translationSV,
    },
}

i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources,
    })

export default i18n
