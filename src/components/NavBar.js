import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import './NavBar.css'
import { useContext } from 'react'
import { UserContext } from '../lib/UserContext'
import { auth } from '../lib/FirebaseApp'
import UserSettings from './nav/UserSettings'
import LanguageSwitch from './nav/LanguageSwitch'
import { Trans } from 'react-i18next'

const pages = [
    { name: 'home', to: '/', onLogin: true },
    { name: 'login', to: '/login', onLogin: false },
    { name: 'register', to: '/register', onLogin: false },
]

const langs = [
    { key: 'de', name: 'german' },
    { key: 'it', name: 'italian' },
    { key: 'en', name: 'english' },
    { key: 'sv', name: 'swedish' },
]

const settings = [{ name: 'logout', callback: () => auth.signOut() }]

const ResponsiveAppBar = () => {
    const { user, profile } = useContext(UserContext)
    const isLoggedIn = !!user && !!profile
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Hangman
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages
                                .filter((page) => page.onLogin === isLoggedIn)
                                .map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Link to={page.to}>
                                            <Typography textAlign="center">
                                                <Trans>
                                                    nav.pages.{page.name}
                                                </Trans>
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        Hangman
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages
                            .filter((page) => page.onLogin === isLoggedIn)
                            .map((page) => (
                                <Link key={page.name} to={page.to}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                        }}
                                    >
                                        <Trans>nav.pages.{page.name}</Trans>
                                    </Button>
                                </Link>
                            ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {isLoggedIn && (
                            <UserSettings
                                settings={settings}
                                profile={profile}
                            />
                        )}
                        <LanguageSwitch langs={langs} profile={profile} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
