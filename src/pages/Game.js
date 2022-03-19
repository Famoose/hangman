import React, { useEffect, useState } from 'react'
import * as randomWords from 'random-words'
import Button from '@mui/material/Button'
import * as PropTypes from 'prop-types'
import { Container, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Revolver from '../components/Revolver'

const usableKeys = [
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
const CHAMBER_SIZE = 10

const Keys = (props) => {
    return (
        <Grid
            container
            spacing={{ xs: 1, md: 1, sm: 1 }}
            columns={{ xs: 5, sm: 6, md: 13 }}
        >
            {usableKeys.map((key) => (
                <Grid item xs={1} sm={1} md={1} key={key}>
                    <Button
                        variant="text"
                        onClick={() => {
                            props.guessKey(key)
                        }}
                        disabled={props.keysUsed.includes(key)}
                    >
                        {key}
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

Keys.propTypes = {
    keysUsed: PropTypes.array,
    guessKey: PropTypes.func,
}

const WordHintDisplayer = (props) => {
    const displayKeyIfGuessed = (key) => {
        return props.keysUsed.includes(key) ? key : '_'
    }

    return (
        <Box
            m={5}
            sx={{ display: 'flex', justifyContent: 'space-evenly' }}
            fullWidth
        >
            {props.word.split('').map((key, index) => (
                <Typography component="h1" key={index} variant="h1">
                    {displayKeyIfGuessed(key)}
                </Typography>
            ))}
        </Box>
    )
}
WordHintDisplayer.propTypes = {
    word: PropTypes.string,
    keysUsed: PropTypes.array,
}

const Game = () => {
    const [points, setPoints] = useState(0)
    const [word, setWord] = useState(randomWords())
    const [round, setRound] = useState(0)
    const [keysUsed, setKeyUsed] = useState([])
    const [revolverShoot, setRevolverShoot] = useState(0)
    const [revolverPosition, setRevolverPosition] = useState(0)
    const shootRevolverVisual = React.useRef(null)

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
                shootRevolverVisual.current(true)
                endRound()
            } else {
                shootRevolverVisual.current(false)
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
        setWord(randomWords())
        spinRevolver()
    }

    const endRound = () => {
        setKeyUsed(() => usableKeys)
        setWord('gameover')
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

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            {/*<Typography component="h1" variant="h5">*/}
            {/*    Guess the word:*/}
            {/*</Typography>*/}
            {/*<p>debug info</p>*/}
            {/*<p>points: {points}</p>*/}
            {/*<p>round: {round}</p>*/}
            {/*<p>revolverShoot: {revolverShoot}</p>*/}
            {/*<p>revolverPosition: {revolverPosition}</p>*/}
            <Revolver shoot={shootRevolverVisual} />
            <WordHintDisplayer word={word} keysUsed={keysUsed} />
            <Keys keysUsed={keysUsed} guessKey={guessKey} />
        </Container>
    )
}
export default Game
