import React, {useContext, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../lib/Context'
import {Container, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import {v4 as uuidv4} from "uuid";

const Home = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate(`/login`)
        }
    }, [user])
    return (
        <Container component="main" maxWidth="xs" sx={{mt: 4}}>
            <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
                Hangman
            </Typography>
            <Link to={{pathname: `/game/${uuidv4()}`}}>
                <Button>Start Game</Button>
            </Link>
        </Container>
    )
}
export default Home
