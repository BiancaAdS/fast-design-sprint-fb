import React from 'react'

import { Routes, Route } from 'react-router-dom'
import { RequireAuth } from './contexts/Auth/RequireAuth'

import { Header } from './shared/components/Header';
import { Page } from './shared/components/Page';

import {
    Home,
    Inicio,
    Etapa4,
    Etapa3,
    Etapa2,
    Etapa1,
} from './pages'


export const RoutesPage = () => {
    return (
        <Routes>
            <Route exact path="/" element={<><Header /><Page><Inicio /></Page></>} />
            <Route path="/home" element={<><Header /><Page><Home /></Page></>} />
            <Route path="/etapa1" element={ <Etapa1 /> } />
            <Route path="/etapa2" element={ <RequireAuth><Etapa2 /></RequireAuth> } />
            <Route path="/etapa3" element={ <RequireAuth><Etapa3 /></RequireAuth> } />
            <Route path="/etapa4" element={ <RequireAuth><Etapa4 /></RequireAuth> } />
        </Routes>
    )
}
