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
import {UserContext} from "../lib/Context";

const Game = () => {
    const {sessionId} = useParams();
    const {user, profile, loading} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !user) {
            navigate(`/login`)
        }
    }, [user])

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
            <Container component="main" maxWidth="md" sx={{mt: 4}}>
                {!isGameOver && <Chip label={`Score: ${points}`} color="primary"/>}
                <Revolver shoot={shootRevolverVisual}/>
                {!isGameOver && <WordHintDisplayer word={word} keysUsed={keysUsed}/>}
                {!isGameOver && <Keys keysUsed={keysUsed} guessKey={guessKey}/>}
            </Container>
            {isGameOver && <>
                <Background/>
                <Container component="div" maxWidth="md"
                           sx={{mt: {xs: -40, sm: -30, md: -20}, position: 'relative', zIndex: 5}}>
                    <Typography component="h1" variant='h1' textAlign='center' sx={{color: 'white'}}>
                        Game Over
                    </Typography>
                    <Typography component="h1" variant='h5' textAlign='center' sx={{color: 'white'}}>
                        it was: {word}
                    </Typography>
                    <Typography component="h3" variant='h3' textAlign='center' sx={{color: 'white'}}>
                        Score: {points}
                    </Typography>
                    <Stack spacing={2} direction="row" justifyContent='center' sx={{mt: {xs: 2, sm: 10, md: 20}}}>
                        <Link to='/'><Button color='primary' variant="outlined">Continue</Button></Link>
                    </Stack>
                </Container>
            </>}

        </>
    )
}
export default Game
