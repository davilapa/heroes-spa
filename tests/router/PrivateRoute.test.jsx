import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth"
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('PrivateRoute tests', () => { 
    test('should show children without login', () => { 
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                name: 'Beto',
                id: '123',
            }
        }
       render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
       ) 

       expect(screen.getByText('Ruta privada')).toBeTruthy();
       expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman");
     });

    //  test('should navigate if its logged', () => { 
    //     const contextValue = {
    //         logged: true,
    //         user: {
    //             name: 'Beto',
    //             id: '123',
    //         }
    //     }

    //     render(
    //         <AuthContext.Provider value={contextValue}>
    //             <MemoryRouter initialEntries={['/login']}>
    //                 <Routes>
    //                     <Route path="login" element={
    //                         <PrivateRoute>
    //                             <h1>Ruta pública</h1>
    //                         </PrivateRoute>
    //                     }/>
    //                     <Route path="marvel" element={<h1>Página marvel</h1>}/>
    //                 </Routes>
                    
    //             </MemoryRouter>
    //         </AuthContext.Provider>
    //     )
    //     //screen.debug();
    //     expect(screen.getByText('Página marvel')).toBeTruthy();
    //   })
 })