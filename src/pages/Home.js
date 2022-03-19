import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../lib/Context'
import { Container, Typography } from '@mui/material'
import Button from '@mui/material/Button'

const Home = () => {
    const { user, profile } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate(`/login`)
        }
    }, [user])
    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
            <Typography component="h1" variant="h5">
                Home
            </Typography>
            {user && profile && (
                <>
                    <p>Currently logged in as: {profile.username}</p>
                    <Link to="/game">
                        <Button>Start Game</Button>
                    </Link>
                </>
            )}
        </Container>
    )
}
export default Home
