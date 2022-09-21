import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth"
import { AppRouter } from '../../src/router/AppRouter';

describe('AppRouter tests', () => { 
    test('should render login when it is autenticated', () => { 
        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getAllByText('Login').length).toBe(2);
     })

     test('should render Marvel component when it is autenticated', () => { 
        const contextValue = {
            logged: true,
            user: {
                name: 'Beto',
                id: '123'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
      })
 })