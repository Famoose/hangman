import React from 'react'
import Button from '@mui/material/Button'
import * as PropTypes from 'prop-types'
import { Container, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Revolver from '../components/Revolver'
import { USABLE_KEYS, useGameController } from '../lib/GameController'

const Keys = (props) => {
    return (
        <Grid
            container
            spacing={{ xs: 1, md: 1, sm: 1 }}
            columns={{ xs: 5, sm: 6, md: 13 }}
        >
            {USABLE_KEYS.map((key) => (
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
    const shootRevolverVisual = React.useRef(null)
    const { word, keysUsed, guessKey } = useGameController((isBullet) => {
        shootRevolverVisual.current(isBullet)
    })

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            <Revolver shoot={shootRevolverVisual} />
            <WordHintDisplayer word={word} keysUsed={keysUsed} />
            <Keys keysUsed={keysUsed} guessKey={guessKey} />
        </Container>
    )
}
export default Game
