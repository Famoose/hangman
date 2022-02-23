import React, { useContext, useEffect } from 'react'
import StartGame from '../components/StartGame'
import { UserContext } from '../lib/Context'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user, profile } = useContext(UserContext)
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
                    {JSON.stringify(user)}
                    <StartGame />
                </>
            )}
        </section>
    )
}
export default Home
