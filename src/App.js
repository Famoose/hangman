import React, { Suspense } from 'react'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { useUserData } from './lib/UserDataState'
import { UserContext } from './lib/UserContext'
import { LangContext } from './lib/LangContext'
import { createTheme, ThemeProvider } from '@mui/material'
import NavBar from './components/NavBar'
import Game from './pages/Game'
import { themeOptions } from './lib/Theme'
import { useLanguageState } from './lib/UseLanguageState'
import { Toaster } from 'react-hot-toast'

function App() {
    const userData = useUserData()
    const userLanguage = useLanguageState()
    const theme = createTheme(themeOptions)

    return (
        <Suspense fallback="loading">
            <ThemeProvider theme={theme}>
                <LangContext.Provider value={userLanguage}>
                    <UserContext.Provider value={userData}>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="game/:sessionId" element={<Game />} />
                        </Routes>
                        <Toaster />
                    </UserContext.Provider>
                </LangContext.Provider>
            </ThemeProvider>
        </Suspense>
    )
}

export default App
