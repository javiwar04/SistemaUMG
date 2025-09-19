import React from 'react'
import { Navigate } from 'react-router-dom'


export function PrivateRoute({ children }) {
    const usuario = localStorage.getItem('usuario'); //revisa si esta logueado
    if (!usuario) {
        return <Navigate to="/" />; // si no hay usuario, redirige al login

    }
    return children; //si hay usuario, renderiza los hijos
}