import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '../lib/FirebaseApp'
import { UserContext } from '../lib/UserContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import {Trans, useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";

const Login = () => {
    const {t} = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate(`/`)
        }
    }, [user])

    const onSubmit = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            reset()
        } catch (e) {
            toast.error('Login failed, please check your email and password')
            console.error('login failed')
            throw new Error(e)
        }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
            <Typography component="h1" variant="h5">
                <Trans>login.title</Trans>
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <TextField
                    label={t('login.email.label')}
                    variant="outlined"
                    id="email"
                    {...register('email', {
                        required: t('login.email.error.required'),
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: t('login.email.error.pattern'),
                        },
                    })}
                    fullWidth
                    margin="normal"
                    autoFocus
                    type="email"
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                />
                <TextField
                    label={t('login.password.label')}
                    variant="outlined"
                    id="password"
                    {...register('password', {
                        required: t('login.password.error.required'),
                        minLength: {
                            value: 5,
                            message: t('login.password.error.minLength'),
                        },
                    })}
                    fullWidth
                    margin="normal"
                    type="password"
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ alignSelf: 'flex-end' }}
                >
                    <Trans>login.submit</Trans>
                </Button>
            </Box>
        </Container>
    )
}
export default Login
