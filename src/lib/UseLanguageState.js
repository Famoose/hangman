import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const localStorageLangKey = 'selectedLanguage'

export function useLanguageState() {
    const [lang, setLang] = useState(localStorage.getItem(localStorageLangKey) || 'en')
    const {i18n} = useTranslation();


    useEffect(() => {
        if (lang) {
            console.info(`InitialLanguage ${lang}`)
            i18n.changeLanguage(lang).then()
        }
    }, [])

    const changeLanguage = (newLanguage) => {
        localStorage.setItem(localStorageLangKey, newLanguage)
        i18n.changeLanguage(newLanguage).then()
        setLang(newLanguage)
    }


    return {lang, changeLanguage}
}