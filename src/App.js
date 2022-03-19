import React from 'react'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { useUserData } from './lib/UserDataState'
import { UserContext } from './lib/Context'
import { createTheme, ThemeProvider } from '@mui/material'
import NavBar from './components/NavBar'

function App() {
    const userData = useUserData()
    const theme = createTheme()

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={userData}>
                <div>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home user={userData} />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Routes>
                </div>
            </UserContext.Provider>
        </ThemeProvider>
    )
}

export default App
