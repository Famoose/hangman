import React, {useContext, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../lib/Context'
import {Container, Grid, Stack, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import {v4 as uuidv4} from "uuid";
import ScoreBoard from "../components/home/ScoreBoard";

const Home = () => {
    const {user, loading} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !user) {
            navigate(`/login`)
        }
    }, [user])

    return (
        <Container component="main" maxWidth="xs"  sx={{mt: 4}}>
            <Stack justifyContent='center' alignItems='center' spacing={4}>
                <Typography component="h1" variant="h2">
                    Hangman
                </Typography>
                <Link to={{pathname: `/game/${uuidv4()}`}}>
                    <Button variant='contained'>Start Game</Button>
                </Link>
                {user && <ScoreBoard user={user}/>}
            </Stack>
        </Container>
    )
}
export default Home
