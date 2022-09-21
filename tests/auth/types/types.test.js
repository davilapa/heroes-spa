import { types } from '../../../src/auth';

describe('Types Tests', () => { 
    test('Should returns types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        })
    })
 })