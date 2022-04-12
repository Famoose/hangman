import * as randomWords from 'random-words'
import * as italian from 'italian-words-dict/dist/words.json';
import * as german from 'german-words-dict/dist/words.json';
import {USABLE_KEYS} from "./GameController";
import {useContext} from "react";
import {LangContext} from "../LangContext";

const ItalianWords = Object.keys(italian)
const GermanWords = Object.keys(german)

const isValidWord = (word) => {
    const wordLetters = word.toLowerCase().split('');
    return wordLetters.length > 2 && wordLetters.every((key) => USABLE_KEYS.includes(key))
}

const whileUntilValidWorld = (wordGenerator) => {
    let isValid = false;
    let word;
    while (!isValid) {
        word = wordGenerator().toLowerCase()
        isValid = isValidWord(word)
    }
    return word;
}

export function WordGenerator() {
    const {lang} = useContext(LangContext)
    const generate = () => {
        if (lang === 'de') {
            return whileUntilValidWorld(() => GermanWords[Math.floor(Math.random() * GermanWords.length)])
        } else if (lang === 'it') {
            return whileUntilValidWorld(() => ItalianWords[Math.floor(Math.random() * ItalianWords.length)])
        } else {
            if (lang !== 'en') {
                console.warn(`language ${lang} not implemented switching to en`)
            }
            return randomWords.default().toLowerCase();
        }
    }

    return {
        generate
    }
}