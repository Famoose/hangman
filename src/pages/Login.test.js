import {act, fireEvent, screen} from "@testing-library/react";
import {contextRender} from "../../test/testUtil";
import Login from "./Login";
import {MemoryRouter} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";

jest.mock('firebase/auth');

describe('Test Login component', () => {
    test('Test successfully login', async () => {
        signInWithEmailAndPassword.mockImplementation((a, e, p) => {
        });
        const providerProps = {value: {user: {email: 'test'}, profile: {username: 'test'}}};
        await act(async () => {
            contextRender(<Login/>, {providerProps, wrapper: MemoryRouter});
        });

        const inputEmail = screen.getByLabelText('Email');
        const inputPassword = screen.getByLabelText('Password');
        const login = screen.getByRole('button', {name: /Login/i});

        await act( async () => {
            fireEvent.input(inputEmail, {target: {value: 'test@test.ch'}});
            fireEvent.input(inputPassword, {target: {value: 'testgh'}});
            fireEvent.submit(login);
        });

        expect(signInWithEmailAndPassword).toHaveBeenCalled();
    })
})