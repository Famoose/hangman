import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '../lib/FirebaseApp'
import { UserContext } from '../lib/Context'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">email</label>
            <input
                id="email"
                {...register('email', {
                    required: 'required',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Entered value does not match email format',
                    },
                })}
                type="email"
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}
            <label htmlFor="password">password</label>
            <input
                id="password"
                {...register('password', {
                    required: 'required',
                    minLength: {
                        value: 5,
                        message: 'min length is 5',
                    },
                })}
                type="password"
            />
            {errors.password && (
                <span role="alert">{errors.password.message}</span>
            )}
            <button type="submit">SUBMIT</button>
        </form>
    )
}
export default Login
