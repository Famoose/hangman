import { act, fireEvent, render, screen } from '@testing-library/react'
import Register from './Register'
import { MemoryRouter } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/FirebaseApp'
import { doc, setDoc } from 'firebase/firestore'

jest.mock('firebase/auth')
jest.mock('firebase/firestore')
jest.mock('../lib/FirebaseApp')

describe('Test Register component', () => {
    beforeEach(() => {
        createUserWithEmailAndPassword.mockImplementation(async (a, e, p) =>
            Promise.resolve({ user: { uid: 'uid' } })
        )
        doc.mockImplementation(() => {})
        setDoc.mockImplementation(() => {})
    })

    it('should successfully register', async () => {
        await act(async () => {
            render(<Register />, { wrapper: MemoryRouter })
        })

        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const inputUsername = screen.getByLabelText('Username')
        const register = screen.getByRole('button', { name: /Register/i })

        await act(async () => {
            fireEvent.input(inputEmail, { target: { value: 'test@test.ch' } })
            fireEvent.input(inputPassword, { target: { value: 'testgh' } })
            fireEvent.input(inputUsername, { target: { value: 'test' } })
            fireEvent.submit(register)
        })

        expect(createUserWithEmailAndPassword).toHaveBeenCalled()
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
            auth,
            'test@test.ch',
            'testgh'
        )
        expect(setDoc).toHaveBeenCalledWith(undefined, { username: 'test' })
    })
    it('should prevent registration if no valid email', async () => {
        await act(async () => {
            render(<Register />, { wrapper: MemoryRouter })
        })

        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const inputUsername = screen.getByLabelText('Username')
        const register = screen.getByRole('button', { name: /Register/i })

        await act(async () => {
            fireEvent.input(inputEmail, { target: { value: 'testtest.ch' } })
            fireEvent.input(inputPassword, { target: { value: 'testgh' } })
            fireEvent.input(inputUsername, { target: { value: 'test' } })
            fireEvent.submit(register)
        })

        expect(createUserWithEmailAndPassword).not.toHaveBeenCalled()
    })

    it('should prevent registration if no valid password', async () => {
        await act(async () => {
            render(<Register />, { wrapper: MemoryRouter })
        })

        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const inputUsername = screen.getByLabelText('Username')
        const register = screen.getByRole('button', { name: /Register/i })

        await act(async () => {
            fireEvent.input(inputEmail, { target: { value: 'test@test.ch' } })
            fireEvent.input(inputPassword, { target: { value: 'test' } })
            fireEvent.input(inputUsername, { target: { value: 'test' } })
            fireEvent.submit(register)
        })

        expect(createUserWithEmailAndPassword).not.toHaveBeenCalled()
    })
    it('should prevent registration if no valid username', async () => {
        await act(async () => {
            render(<Register />, { wrapper: MemoryRouter })
        })

        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const inputUsername = screen.getByLabelText('Username')
        const register = screen.getByRole('button', { name: /Register/i })

        await act(async () => {
            fireEvent.input(inputEmail, { target: { value: 'test@test.ch' } })
            fireEvent.input(inputPassword, { target: { value: 'test' } })
            fireEvent.input(inputUsername, { target: { value: '' } })
            fireEvent.submit(register)
        })

        expect(createUserWithEmailAndPassword).not.toHaveBeenCalled()
    })
})
