import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/Navbar";
import { MemoryRouter, useNavigate } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Navbar tests', () => { 
    const authContextValue = {
        logged: true,
        user: {
            name: 'Beto',
            id: '123'
        },
        logout: jest.fn()
    }
    beforeEach(() => jest.clearAllMocks());

    test('should show user name', () => { 
        
        render(
            <AuthContext.Provider value={authContextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Beto')).toBeTruthy();
     });

     test('should call logout and navigate when click logout button', () => { 
        render(
            <AuthContext.Provider value={authContextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        
        const logoutBtn = screen.getByRole('button')
        fireEvent.click(logoutBtn);
        
        expect(authContextValue.logout).toHaveBeenCalledTimes(1);
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { "replace": true });
      })
 })
