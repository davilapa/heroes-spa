import { Route, Routes } from 'react-router-dom'

import { LoginPage } from '../auth';
import { Navbar } from '../ui';
import { HeoresRoutes } from '../heroes/routes/HeoresRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <>
        <Routes>
            

            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/*" element={
              <PrivateRoute>
                <HeoresRoutes />
              </PrivateRoute>
            } />
        </Routes>
    </>
  )
}
