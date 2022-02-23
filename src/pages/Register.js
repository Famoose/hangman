import React from 'react'
import { useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../lib/FirebaseApp'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

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
            const navigate = useNavigate()
            navigate(`/login`)
        } catch (e) {
            console.error('register failed')
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
            <label htmlFor="username">username</label>
            <input
                id="username"
                {...register('username', {
                    required: 'required',
                    minLength: {
                        value: 3,
                        message: 'min length is 3',
                    },
                })}
                type="text"
            />
            {errors.username && (
                <span role="alert">{errors.username.message}</span>
            )}
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
export default Register
