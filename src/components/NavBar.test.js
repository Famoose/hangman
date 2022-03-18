import {fireEvent, render, screen} from "@testing-library/react";
import NavBar from "./NavBar";
import {UserContext} from '../lib/Context'
import {MemoryRouter} from "react-router-dom";
import {auth} from "../lib/FirebaseApp";

jest.mock('../lib/FirebaseApp');

describe('NavBar tests', () => {
    const contextRender = (ui, {providerProps, ...renderOptions}) => {
        return render(
            <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
            renderOptions,
        )
    }

    test('should render login and register without user', async () => {
        const providerProps = {value: {user: null, profile: null}};

        contextRender(<NavBar/>, {providerProps, wrapper: MemoryRouter});

        const logins = screen.queryAllByText(/login/i);
        const registers = screen.queryAllByText(/register/i);
        const homes = screen.queryAllByText(/home/i);

        expect(logins).toHaveLength(2);
        logins.forEach((login) => {
            expect(login).toBeInTheDocument();
        })
        expect(registers).toHaveLength(2);
        registers.forEach((register) => {
            expect(register).toBeInTheDocument();
        })
        expect(homes).toHaveLength(0);
    });

    test('should render home with user', async () => {
        const providerProps = {value: {user: {email: 'test'}, profile: {username: 'test'}}};

        contextRender(<NavBar/>, {providerProps, wrapper: MemoryRouter})

        const logins = screen.queryAllByText(/login/i);
        const registers = screen.queryAllByText(/register/i);
        const homes = screen.queryAllByText(/home/i);

        expect(logins).toHaveLength(0);
        expect(registers).toHaveLength(0);
        expect(homes).toHaveLength(2);
        homes.forEach((home) => {
            expect(home).toBeInTheDocument();
        })
    });

    test('should Logout', () => {
        auth.signOut.mockImplementation(() => {});
        const providerProps = {value: {user: {email: 'test'}, profile: {username: 'test'}}};

        contextRender(<NavBar/>, {providerProps, wrapper: MemoryRouter})

        fireEvent.click(screen.getByText(/Logout/i));
        expect(auth.signOut).toHaveBeenCalled();
    });
});

