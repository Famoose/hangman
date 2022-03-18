import React, {useContext, useEffect} from 'react'
import StartGame from '../components/StartGame'
import {useNavigate} from 'react-router-dom'
import {UserContext} from "../lib/Context";
import {Container, Typography} from "@mui/material";

const Home = () => {
    const {user, profile} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate(`/login`)
        }
    }, [user])
    return (
        <Container component="main" maxWidth="xs" sx={{mt:4}}>
            <Typography component="h1" variant="h5">
                Home
            </Typography>
            {user && profile && (
                <>
                    <p>Currently logged in as: {profile.username}</p>
                    <StartGame/>
                </>
            )}
        </Container>
    )
}
export default Home
