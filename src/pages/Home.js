import React, {useContext, useEffect} from 'react'
import StartGame from '../components/StartGame'
import {useNavigate} from 'react-router-dom'
import {UserContext} from "../lib/Context";

const Home = () => {
    const {user, profile} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate(`/login`)
        }
    }, [user])
    return (
        <section>
            <h1>Home</h1>
            {user && profile && (
                <>
                    <p>Currently logged in as: {profile.username}</p>
                    <StartGame/>
                </>
            )}
        </section>
    )
}
export default Home
