import React from 'react'

import { Routes, Route } from 'react-router-dom'

import {
    Home,
    Inicio,
    Etapa1,
    Etapa2,
    Etapa3,
    Etapa4
} from './pages'

export const RoutesPage = () => {
    return (
        <Routes>
            <Route exact path="/" element={ <Inicio /> } />
            <Route path="/home" element={ <Home /> } />
            <Route path="/etapa1" element={ <Etapa1 /> } />
            <Route path="/etapa2" element={ <Etapa2 /> } />
            <Route path="/etapa3" element={ <Etapa3 /> } />
            <Route path="/etapa4" element={ <Etapa4 /> } />
        </Routes>
    )
}
