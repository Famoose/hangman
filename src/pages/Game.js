import React, { useContext, useEffect, useState } from 'react'
import { Chip, Container, Slider, Stack, Typography } from '@mui/material'
import Revolver from '../components/game/Revolver'
import { useGameController } from '../lib/game/GameController'
import WordHintDisplayer from '../components/game/WordHintDisplayer'
import Keys from '../components/game/Keys'
import Background from '../components/game/Background'
import Button from '@mui/material/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { db, getUid } from '../lib/FirebaseApp'
import { UserContext } from '../lib/UserContext'
import { Trans, useTranslation } from 'react-i18next'
import useSound from 'use-sound'
import { VolumeDown, VolumeMute, VolumeUp } from '@mui/icons-material'

const VOLUME_KEY = 'gameVolume'

const Game = () => {
    const { t } = useTranslation()

    const [volume, setVolume] = useState(
        localStorage.getItem(VOLUME_KEY)
            ? parseFloat(localStorage.getItem(VOLUME_KEY))
            : 0.4
    )
    const [playMiss] = useSound(
        `${process.env.PUBLIC_URL}/sounds/revolver-miss.mp3`,
        { volume }
    )
    const [playSpin] = useSound(
        `${process.env.PUBLIC_URL}/sounds/revolver-spin.mp3`,
        { volume, interrupt: true }
    )
    const [playFire] = useSound(
        `${process.env.PUBLIC_URL}/sounds/revolver-fire.mp3`,
        { volume }
    )

    const handleVolumeChange = (event, newVolume) => {
        localStorage.setItem(VOLUME_KEY, newVolume)
        setVolume(newVolume)
    }

    const { sessionId } = useParams()
    const { user, profile, loading } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !user) {
            navigate(`/login`)
        }
    }, [user, loading])

    const shootRevolverVisual = React.useRef(null)
    const shootRevolverCallback = (isBullet) => {
        shootRevolverVisual.current(isBullet)
        if (isBullet) {
            playFire()
        } else {
            playMiss()
        }
    }

    const onRoundComplete = async () => {
        playFire()
        if (points > 0) {
            await setDoc(doc(db, 'users', getUid(), 'scores', sessionId), {
                points,
                username: profile.username,
            })
        }
    }

    let { word, keysUsed, guessKey, points, isGameOver } = useGameController(
        shootRevolverCallback,
        onRoundComplete
    )

    useEffect(() => {
        if (playSpin) {
            playSpin()
        }
    }, [playSpin])

    return (
        <>
            <Container
                component="main"
                maxWidth="md"
                sx={{ mt: 2, position: 'relative', zIndex: 0 }}
            >
                {!isGameOver && (
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Chip
                            label={t('game.score', { points })}
                            color="primary"
                        />
                        <Stack
                            spacing={1}
                            direction="row"
                            sx={{ mb: 1 }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {volume > 0 ? <VolumeDown /> : <VolumeMute />}
                            <Slider
                                aria-label="Volume"
                                value={volume}
                                size="small"
                                max={1}
                                min={0}
                                sx={{ width: 40 }}
                                step={0.1}
                                onChange={handleVolumeChange}
                            />
                            <VolumeUp />
                        </Stack>
                    </Stack>
                )}
                <Revolver shoot={shootRevolverVisual} />
                {!isGameOver && (
                    <WordHintDisplayer word={word} keysUsed={keysUsed} />
                )}
                {!isGameOver && (
                    <Keys keysUsed={keysUsed} guessKey={guessKey} />
                )}
            </Container>
            {isGameOver && (
                <>
                    <Background />
                    <Container
                        component="div"
                        maxWidth="md"
                        sx={{
                            mt: { xs: -25, sm: -30, md: -30 },
                            position: 'relative',
                            zIndex: 50,
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h1"
                            textAlign="center"
                            sx={{ color: 'white' }}
                        >
                            <Trans>game.gameover</Trans>
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h5"
                            textAlign="center"
                            sx={{ color: 'white' }}
                        >
                            <Trans i18nKey="game.hint">
                                It was: {{ word }}
                            </Trans>
                        </Typography>
                        <Typography
                            component="h3"
                            variant="h3"
                            textAlign="center"
                            sx={{ color: 'white' }}
                        >
                            <Trans i18nKey="game.score">
                                Score: {{ points }}
                            </Trans>
                        </Typography>
                        <Stack
                            spacing={2}
                            direction="row"
                            justifyContent="center"
                            sx={{ mt: { xs: 2, sm: 10, md: 20 } }}
                        >
                            <Link to="/">
                                <Button variant="contained">
                                    <Trans>game.continue</Trans>
                                </Button>
                            </Link>
                        </Stack>
                    </Container>
                </>
            )}
        </>
    )
}
export default Game
