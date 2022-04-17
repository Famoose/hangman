import * as randomWords from 'random-words'
import { USABLE_KEYS } from './GameController'
import { useCallback, useContext, useEffect, useState } from 'react'
import { LangContext } from '../LangContext'

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

export function WordGenerator() {
    const { lang } = useContext(LangContext)

    const [germanWords, setGermanWords] = useState([])
    const [italianWords, setItalianWords] = useState([])
    const [swedishWords, setSwedishWords] = useState([])

    const [generate, setGenerate] = useState(null)

    const fetchWordDicts = useCallback(() => {
        fetch(`${process.env.PUBLIC_URL}/wordDicts/german/words.json`)
            .then((r) => r.json())
            .then((r) => setGermanWords(r))
        fetch(`${process.env.PUBLIC_URL}/wordDicts/italian/words.json`)
            .then((r) => r.json())
            .then((r) => setItalianWords(r))
        fetch(`${process.env.PUBLIC_URL}/wordDicts/swedish/words.json`)
            .then((r) => r.json())
            .then((r) => setSwedishWords(r))
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
