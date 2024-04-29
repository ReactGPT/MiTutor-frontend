import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import PageInicioTutor from './pages/tutor/inicio/PageInicioTutor.tsx';
import PageCalendarioTutor from './pages/tutor/calendario/PageCalendarioTutor.tsx';
import PageListaDeCitasTutor from './pages/tutor/listaDeCitas/PageListaDeCitasTutor.tsx';
import PageProgramasDeTutoriaTutor from './pages/tutor/programasDeTutoria/PageProgramasDeTutoriaTutor.tsx';
import PageMiPerfilTutor from './pages/tutor/miPerfil/PageMiPerfilTutor.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <PageInicioTutor />,
      },
      {
        path: '/calendario',
        element: <PageCalendarioTutor />,
      },
      {
        path: '/programasDeTutoria',
        element: <PageProgramasDeTutoriaTutor />,
      },
      {
        path: '/listaDeCitas',
        element: <PageListaDeCitasTutor />,
      },
      {
        path: '/miPerfil',
        element: <PageMiPerfilTutor />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
