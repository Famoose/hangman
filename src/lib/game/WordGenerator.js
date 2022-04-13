import * as randomWords from 'random-words'
import {USABLE_KEYS} from "./GameController";
import {useContext, useEffect, useState} from "react";
import {LangContext} from "../LangContext";

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
    const [GermanWords, setGermanWords] = useState([])
    const [ItalianWords, setItalianWords] = useState([])
    const [generate, setGenerate] = useState(null)

    const fetchWordDicts = () => {
        fetch(`${process.env.PUBLIC_URL}/wordDicts/german/words.json`)
            .then(r => r.json())
            .then((r) => setGermanWords(r))
        fetch(`${process.env.PUBLIC_URL}/wordDicts/italian/words.json`)
            .then(r => r.json())
            .then((r) => setItalianWords(r))
    }

    useEffect(() => {
        fetchWordDicts()
    }, [])

    useEffect(() => {
        if(ItalianWords.length > 0 && GermanWords.length > 0){
            setGenerate(() => () => {
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
            })
        }
    }, [ItalianWords, GermanWords])

    return {
        generate
    }
}