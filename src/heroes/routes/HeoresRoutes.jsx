import { Navigate, Route, Routes } from 'react-router-dom'

import { Navbar } from "../../ui"
import { DCPage, HeroPage, MarvelPage, SearchPage } from '../pages';
import { LoginPage } from '../../auth';

export const HeoresRoutes = () => {
  return (
    <>
        <Navbar />
        <div className="container">
          <Routes>
              <Route path="marvel" element={<MarvelPage />} />
              <Route path="dc" element={<DCPage />} />

              <Route path="search" element={<SearchPage />} />
              <Route path="hero/:id" element={<HeroPage />} />

              <Route path="login" element={<LoginPage />} />

              <Route path="/" element={<Navigate to="/marvel" />} />
          </Routes>
        </div>
    </>
  )
}
