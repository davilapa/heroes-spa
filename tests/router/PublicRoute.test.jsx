import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth"
import { PublicRoute } from '../../src/router/PublicRoute';

describe('PublicRoute tests', () => { 
    test('should show children without login', () => { 
        const contextValue = {
            logged: false,
        }
       render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
       ) 

       expect(screen.getByText('Ruta pública')).toBeTruthy();
     });

     test('should navigate if its logged', () => { 
        const contextValue = {
            logged: true,
            user: {
                name: 'Beto',
                id: '123',
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        }/>
                        <Route path="marvel" element={<h1>Página marvel</h1>}/>
                    </Routes>
                    
                </MemoryRouter>
            </AuthContext.Provider>
        )
        //screen.debug();
        expect(screen.getByText('Página marvel')).toBeTruthy();
      })
 })