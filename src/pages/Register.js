import React from 'react'
import { useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../lib/FirebaseApp'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import {Trans, useTranslation} from "react-i18next";

const Register = () => {
    const {t} = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const credential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            const userDoc = doc(db, 'users', credential.user.uid)
            await setDoc(userDoc, {
                username: data.username,
            })
            reset()
            navigate(`/login`)
        } catch (e) {
            console.error('register failed')
            throw new Error(e)
        }
    }
    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
            <Typography component="h1" variant="h5">
                <Trans>register.title</Trans>
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
                    label={t('register.email.label')}
                    variant="outlined"
                    id="email"
                    {...register('email', {
                        required: t('register.email.error.required'),
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: t('register.email.error.pattern'),
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
                    label={t('register.username.label')}
                    variant="outlined"
                    id="username"
                    {...register('username', {
                        required: t('register.username.error.required'),
                        minLength: {
                            value: 3,
                            message: t('register.username.error.minLength'),
                        },
                    })}
                    type="text"
                    fullWidth
                    margin="normal"
                    error={!!errors?.username}
                    helperText={errors?.username?.message}
                />
                <TextField
                    label={t('register.password.label')}
                    variant="outlined"
                    id="password"
                    {...register('password', {
                        required: t('register.password.error.required'),
                        minLength: {
                            value: 5,
                            message: t('register.password.error.minLength'),
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
                    Register
                </Button>
            </Box>
        </Container>
    )
}
export default Register
