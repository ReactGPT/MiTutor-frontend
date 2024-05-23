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
<<<<<<< Updated upstream
=======
import PageDetalleProgramaTutoriaTutor from './pages/tutor/programasDeTutoria/PageDetalleProgramaTutoriaTutor.tsx';
import PageHistoricoDeCitas from './pages/tutor/listaDeCitas/PageHistoricoDeCitas.tsx';
import PageListaDeCitas from './pages/tutor/listaDeCitas/PageListaDeCitas.tsx';
import PageProgTutoria from './pages/coordinador/programasDeTutoria/PageProgTutoria.tsx';
import PageProgramasTutoriaMaestro from './pages/coordinador/programasDeTutoria/PageProgramasTutoriaMaestro.tsx';
import PageAgregarDisponibilidadTutor from './pages/tutor/calendario/PageAgregarDisponibilidadTutor.tsx';
import PageDerivacionesHechas from './pages/tutor/miPerfil/PageDerivacionesHechas.tsx';
import PagePerfilAlumnoTutor from './pages/tutor/programasDeTutoria/PagePerfilAlumnoTutor.tsx';
import PageSolicitarAlumno from './pages/tutor/solicitarTutor/PageSolicitarAlumno.tsx';

>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
      {
        path: '/programasDeTutoria/detalle-programa',
        element: <PageDetalleProgramaTutoriaTutor />
      },
      {
        path: '/programasDeTutoria/detalle-programa/alumno',
        element: <PagePerfilAlumnoTutor />
      },
      {
        path: '/historicoDeCitas',
        element: <PageHistoricoDeCitas />,
      },
      {
        path: '/programasDeTutoriaMaestro/nuevo',
        element: <PageProgTutoria />,
      },
      {
        path: '/programasDeTutoriaMaestro',
        element: <PageProgramasTutoriaMaestro />,
      },
      {
        path: '/agregarDisponibilidad',
        element: <PageAgregarDisponibilidadTutor />,
      },
      {
        path: '/misDerivacionesHechas',
        element: <PageDerivacionesHechas />
      },
      {
        path: '/solicitarTutor',
        element: <PageSolicitarAlumno/>
      }
>>>>>>> Stashed changes
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
