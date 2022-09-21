import { authReducer, types } from '../../../src/auth';

describe('Pruebas en AuthReducer', () => { 

    test('should return default state', () => { 
        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual({ logged: false});
     })

    test('should call login and put the username', () => { 
        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123'
            }
        }

        const state = authReducer({ logged: false }, action);

        expect( state ).toEqual({
            logged: true,
            user: action.payload
        })
     })

    test('should delete username and logged in false', () => { 
        const state = {
            logged: true,
            user: {
                name: 'Juan',
                id: '123'
            }
        }

        const action = {
            type: types.logout
        }

        const newState = authReducer(state, action);

        expect( newState ).toEqual({ logged: false });
     })
 })