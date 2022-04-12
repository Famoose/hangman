import {useEffect, useState} from 'react'
import * as randomWords from 'random-words'

export const USABLE_KEYS = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
]
export const CHAMBER_SIZE = 10

export function useGameController(shootCallback, onRoundComplete) {
    const [points, setPoints] = useState(0)
    const [word, setWord] = useState(randomWords.default())
    const [round, setRound] = useState(0)
    const [keysUsed, setKeyUsed] = useState([])
    const [revolverShoot, setRevolverShoot] = useState(0)
    const [revolverPosition, setRevolverPosition] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)

    useEffect(() => {
        spinRevolver()
    }, [])

    const guessKey = (key) => {
        if (keysUsed.includes(key)) {
            return
        }
        setKeyUsed((keysUsed) => [...keysUsed, key])
        if (wordContainsKey(word, key)) {
            if (isWordGuessed(word, [...keysUsed, key])) {
                //complete round and add points
                completeRound()
            }
        } else {
            // returns true if revolver hits bullet
            if (triggerRevolver()) {
                if (shootCallback) {
                    shootCallback(true)
                }
                endRound()
            } else {
                if (shootCallback) {
                    shootCallback(false)
                }
            }
        }
    }

    const isWordGuessed = (wordToGuess, letters) => {
        return wordToGuess.split('').every((key) => letters.includes(key))
    }

    const wordContainsKey = (wordToGuess, letter) => {
        return wordToGuess.includes(letter)
    }

    const completeRound = () => {
        setKeyUsed(() => [])
        setPoints(points + word.length)
        setRound(round + 1)
        setWord(randomWords.default())
        spinRevolver()
    }

    const endRound = () => {
        if (onRoundComplete) {
            onRoundComplete()
        }
        setKeyUsed(() => USABLE_KEYS)
        setWord('gameover')
        setIsGameOver(true)
    }

    const spinRevolver = () => {
        setRevolverShoot(Math.floor(Math.random() * CHAMBER_SIZE))
        setRevolverPosition(Math.floor(Math.random() * CHAMBER_SIZE))
    }

    const triggerRevolver = () => {
        const newPosition = (revolverPosition + 1) % CHAMBER_SIZE
        setRevolverPosition(newPosition)
        return newPosition === revolverShoot
    }

    return {
        word,
        round,
        points,
        keysUsed,
        guessKey,
        isGameOver
    }
}
