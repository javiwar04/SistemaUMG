// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { DashboardLayout } from "./pages/DashboardLayout";
import { Inicio } from './pages/Inicio';
import { Alumnos } from './pages/Alumnos';
import { Calificaciones } from './pages/Calificaciones';
import { Profesores } from './pages/Profesores';
import { PrivateRoute } from './components/PrivateRoute';

export function App() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Inicio />} />
        <Route path="profesores" element={<Profesores />} />
        <Route path="alumnos" element={<Alumnos />} />
        <Route path="calificaciones" element={<Calificaciones />} />
      </Route>
    </Routes>
  );
}
