import React from 'react'
import { useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../lib/FirebaseApp'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, TextField, Typography } from '@mui/material'

const Register = () => {
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
            console.log(credential)
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
                Register
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
                    label="Username"
                    variant="outlined"
                    id="username"
                    {...register('username', {
                        required: 'required',
                        minLength: {
                            value: 3,
                            message: 'min length is 3',
                        },
                    })}
                    type="text"
                    fullWidth
                    margin="normal"
                    error={!!errors?.username}
                    helperText={errors?.username?.message}
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
                    Register
                </Button>
            </Box>
        </Container>
    )
}
export default Register
