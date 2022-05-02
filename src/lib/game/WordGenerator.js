import * as randomWords from 'random-words'
import {USABLE_KEYS} from './GameController'
import {useCallback, useContext, useEffect, useState} from 'react'
import {LangContext} from '../LangContext'
import {WordService} from "../integration/WordService";

const isValidWord = (word) => {
    const wordLetters = word.toLowerCase().split('')
    return (
        wordLetters.length > 2 &&
        wordLetters.every((key) => USABLE_KEYS.includes(key))
    )
}

const whileUntilValidWorld = (wordGenerator) => {
    let isValid = false
    let word
    while (!isValid) {
        word = wordGenerator().toLowerCase()
        isValid = isValidWord(word)
    }
    return word
}

export function useWordGenerator() {
    const {lang} = useContext(LangContext)

    const [germanWords, setGermanWords] = useState([])
    const [italianWords, setItalianWords] = useState([])
    const [swedishWords, setSwedishWords] = useState([])

    const [generate, setGenerate] = useState(null)

    const fetchWordDicts = useCallback(async () => {
        const {getWordDicts} = WordService();

        const german = await getWordDicts('german')
        setGermanWords(german)

        const italian = await getWordDicts('italian')
        setItalianWords(italian)

        const swedish = await getWordDicts('swedish')
        setSwedishWords(swedish)

    }, [])

    useEffect(() => {
        fetchWordDicts()
    }, [])

    useEffect(() => {
        if (
            italianWords.length > 0 &&
            germanWords.length > 0 &&
            swedishWords.length > 0
        ) {
            setGenerate(() => () => {
                if (lang === 'de') {
                    return whileUntilValidWorld(
                        () =>
                            germanWords[
                                Math.floor(Math.random() * germanWords.length)
                                ]
                    )
                } else if (lang === 'it') {
                    return whileUntilValidWorld(
                        () =>
                            italianWords[
                                Math.floor(Math.random() * italianWords.length)
                                ]
                    )
                } else if (lang === 'sv') {
                    return whileUntilValidWorld(
                        () =>
                            swedishWords[
                                Math.floor(Math.random() * swedishWords.length)
                                ]
                    )
                } else {
                    if (lang !== 'en') {
                        console.warn(
                            `language ${lang} not implemented switching to en`
                        )
                    }
                    return randomWords.default().toLowerCase()
                }
            })
        }
    }, [italianWords, germanWords, swedishWords])

    return {
        generate,
    }
}
