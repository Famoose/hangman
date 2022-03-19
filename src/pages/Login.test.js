import { act, fireEvent, screen } from '@testing-library/react'
import { contextRender } from '../../test/testUtil'
import Login from './Login'
import { MemoryRouter } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/FirebaseApp'

jest.mock('firebase/auth')
jest.mock('../lib/FirebaseApp')

describe('Test Login component', () => {
    test('should successfully login', async () => {
        signInWithEmailAndPassword.mockImplementation((a, e, p) => {})
        const providerProps = {
            value: { user: { email: 'test' }, profile: { username: 'test' } },
        }
        await act(async () => {
            contextRender(<Login />, { providerProps, wrapper: MemoryRouter })
        })

        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const login = screen.getByRole('button', { name: /Login/i })

        await act(async () => {
            fireEvent.input(inputEmail, { target: { value: 'test@test.ch' } })
            fireEvent.input(inputPassword, { target: { value: 'testgh' } })
            fireEvent.submit(login)
        })

        expect(signInWithEmailAndPassword).toHaveBeenCalled()
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
            auth,
            'test@test.ch',
            'testgh'
        )
    })
    test('should prevent login if no valid email', async () => {
        signInWithEmailAndPassword.mockImplementation((a, e, p) => {})
        const providerProps = {
            value: { user: { email: 'test' }, profile: { username: 'test' } },
        }
        await act(async () => {
            contextRender(<Login />, { providerProps, wrapper: MemoryRouter })
        })

        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const login = screen.getByRole('button', { name: /Login/i })

        await act(async () => {
            fireEvent.input(inputEmail, { target: { value: 'testtest.ch' } })
            fireEvent.input(inputPassword, { target: { value: 'testgh' } })
            fireEvent.submit(login)
        })

        expect(signInWithEmailAndPassword).not.toHaveBeenCalled()
    })

    test('should prevent login if no valid password', async () => {
        signInWithEmailAndPassword.mockImplementation((a, e, p) => {})
        const providerProps = {
            value: { user: { email: 'test' }, profile: { username: 'test' } },
        }
        await act(async () => {
            contextRender(<Login />, { providerProps, wrapper: MemoryRouter })
        })

        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Password')
        const login = screen.getByRole('button', { name: /Login/i })

        await act(async () => {
            fireEvent.input(inputEmail, { target: { value: 'test@test.ch' } })
            fireEvent.input(inputPassword, { target: { value: 'test' } })
            fireEvent.submit(login)
        })

        expect(signInWithEmailAndPassword).not.toHaveBeenCalled()
    })
})
