import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '../lib/FirebaseApp'
import { UserContext } from '../lib/Context'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, TextField, Typography } from '@mui/material'

const Login = () => {
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
            console.error('login failed')
            throw new Error(e)
        }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
            <Typography component="h1" variant="h5">
                Login
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
                    label="Email"
                    variant="outlined"
                    id="email"
                    {...register('email', {
                        required: 'required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message:
                                'Entered value does not match email format',
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
                    label="Password"
                    variant="outlined"
                    id="password"
                    {...register('password', {
                        required: 'required',
                        minLength: {
                            value: 5,
                            message: 'min length is 5',
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
                    Login
                </Button>
            </Box>
        </Container>
    )
}
export default Login
