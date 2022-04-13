import React, {useContext, useEffect} from 'react'
import {Chip, Container, Stack, Typography} from '@mui/material'
import Revolver from '../components/game/Revolver'
import {useGameController} from '../lib/game/GameController'
import WordHintDisplayer from "../components/game/WordHintDisplayer";
import Keys from "../components/game/Keys";
import Background from "../components/game/Background";
import Button from "@mui/material/Button";
import {Link, useNavigate, useParams} from "react-router-dom";
import {doc, setDoc} from 'firebase/firestore';
import {db, getUid} from "../lib/FirebaseApp";
import {UserContext} from "../lib/UserContext";
import {Trans, useTranslation} from "react-i18next";

const Game = () => {
    const {t} = useTranslation();

    const {sessionId} = useParams();
    const {user, profile, loading} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !user) {
            navigate(`/login`)
        }
    }, [user, loading])

    const shootRevolverVisual = React.useRef(null)
    const shootRevolverCallback = (isBullet) => {
        shootRevolverVisual.current(isBullet)
    }

    const onRoundComplete = async () => {
        if (points > 0) {
            await setDoc(doc(db, 'users', getUid(), 'scores', sessionId),
                {points, username: profile.username}
            )
        }
    }

    let {word, keysUsed, guessKey, points, isGameOver} = useGameController(shootRevolverCallback, onRoundComplete)

    return (
        <>

            <Container component="main" maxWidth="md" sx={{mt: 2, position: 'relative', zIndex: 0}}>
                {!isGameOver && <Chip label={t('game.score', {points})} color="primary"/>}
                <Revolver shoot={shootRevolverVisual}/>
                {!isGameOver && <WordHintDisplayer word={word} keysUsed={keysUsed}/>}
                {!isGameOver && <Keys keysUsed={keysUsed} guessKey={guessKey}/>}
            </Container>
            {isGameOver && <>
                <Background/>
                <Container component="div" maxWidth="md"
                           sx={{mt: {xs: -25, sm: -30, md: -30}, position: 'relative', zIndex: 50}}>
                    <Typography component="h1" variant='h1' textAlign='center' sx={{color: 'white'}}>
                        <Trans>game.gameover</Trans>
                    </Typography>
                    <Typography component="h1" variant='h5' textAlign='center' sx={{color: 'white'}}>
                        <Trans i18nKey='game.hint' >It was: {{word}}</Trans>
                    </Typography>
                    <Typography component="h3" variant='h3' textAlign='center' sx={{color: 'white'}}>
                        <Trans i18nKey='game.score' >Score: {{points}}</Trans>
                    </Typography>
                    <Stack spacing={2} direction="row" justifyContent='center' sx={{mt: {xs: 2, sm: 10, md: 20}}}>
                        <Link to='/'><Button variant="contained"><Trans>game.continue</Trans></Button></Link>
                    </Stack>
                </Container>
            </>}

        </>
    )
}
export default Game
