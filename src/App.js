import React from 'react'
import './App.css'
import Home from './pages/Home'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { useUserData } from './lib/UserDataState'
import { UserContext } from './lib/Context'

function App() {
    const userData = useUserData()

    return (
        <UserContext.Provider value={userData}>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </div>
        </UserContext.Provider>
    )
}

export default App
