"use client";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import PageInicioTutor from './pages/tutor/inicio/PageInicioTutor.tsx';
import PageCalendarioTutor from './pages/tutor/calendario/PageCalendarioTutor.tsx';
import PageProgramasDeTutoriaTutor from './pages/tutor/programasDeTutoria/PageProgramasDeTutoriaTutor.tsx';
import PageMiPerfilTutor from './pages/tutor/miPerfil/PageMiPerfilTutor.tsx';
import PageDetalleProgramaTutoriaTutor from './pages/tutor/programasDeTutoria/PageDetalleProgramaTutoriaTutor.tsx';
import PageHistoricoDeCitas from './pages/tutor/listaDeCitas/PageHistoricoDeCitas.tsx';
import PageListaDeCitas from './pages/tutor/listaDeCitas/PageListaDeCitas.tsx';

import PageProgTutoria from './pages/coordinador/programasDeTutoria/PageProgTutoria.tsx';
import PageProgramasTutoriaMaestro from './pages/coordinador/programasDeTutoria/PageProgramasTutoriaMaestro.tsx';

import PageAgregarDisponibilidadTutor from './pages/tutor/calendario/PageAgregarDisponibilidadTutor.tsx';
import PageDerivacionesHechas from './pages/tutor/miPerfil/PageDerivacionesHechas.tsx';
import PagePerfilAlumnoTutor from './pages/tutor/programasDeTutoria/PagePerfilAlumnoTutor.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import PageListadoPlanAccion from './pages/tutor/listaDeCitas/PageListadoPlanAccion.tsx';
import PageDetallePlanAccion from './pages/tutor/listaDeCitas/PageDetallePlanAccion.tsx';
import PageResultadoCitaIndividual from './pages/tutor/resultadoCita/PageResultadoCitaIndividual.tsx';
import PageMiPerfilAlumno from './pages/alumno/miPerfil/PageMiPerfilAlumno.tsx';
import PageListaDeTutorias from './pages/alumno/listaDeTutorias/pageListaDeTutorias.tsx';
import PageDetalleDeTutoria from './pages/alumno/detalleDeCita/pageDetalleDeTutoria.tsx';
import PageDetalleDeTutoriaSolicitado from './pages/alumno/detalleDeCita/pageDetalleDeTutoriaSolicitado.tsx';
import PageDetalleDeTutoriaVariable from './pages/alumno/detalleDeCita/pageDetalleDeCitaVariable.tsx';
import PageSolicitarAlumno from './pages/tutor/solicitarTutor/PageSolicitarAlumno.tsx';
import PageListadoPlanAccionAlumno from './pages/alumno/PlanDeAccion/PageListadoPlanAccionAlumno.tsx';
import PageDetallePlanAccionAlumno from './pages/alumno/PlanDeAccion/PageDetallePlanAccionAlumno.tsx';
import PageSolicitarCita from './pages/alumno/misTutorias/PageSolicitarCita.tsx';

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
        element: <PageListaDeCitas />,
      },
      {
        path: '/miPerfil',
        element: <PageMiPerfilTutor />,
      },
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
        path: '/listadoPlanAccion',
        element: <PageListadoPlanAccion />,
      },
      {
        path: '/detallePlanAccion',
        element: <PageDetallePlanAccion />,
      },
      {
        path: '/PerfilAlumno',
        element: <PageMiPerfilAlumno />
      },
      {
        path: '/programasDeTutoriaMaestro',
        element: <PageProgramasTutoriaMaestro />,
      },
      {
        path: '/calendario/agregarDisponibilidad',
        element: <PageAgregarDisponibilidadTutor />,
      },
      {
        path: '/misDerivacionesHechas',
        element: <PageDerivacionesHechas />
      },
      {
        path: '/programasDeTutoriaMaestro/editar',
        element: <PageProgTutoria />
      },
      {
        path: '/listaTutoriasAlumno',
        element: <PageListaDeTutorias />
      },
      {
        path: '/detalleDeTutoria',
        element: <PageDetalleDeTutoria />
      },      {
        path: '/detalleDeTutoriaSolicitado',
        element: <PageDetalleDeTutoriaSolicitado />
      },
      {
        path:'/detalleDeTutoriaVariable',
        element:<PageDetalleDeTutoriaVariable/>
      },
      {
        path: '/listaDeCitas/resultadoCitaIndividual',
        element: <PageResultadoCitaIndividual />
      },
      {
        path: '/solicitarTutor',

        element: <PageSolicitarAlumno/>

      },
      {
        path: '/listadoPlanAccionAlumno',
        element: <PageListadoPlanAccionAlumno />
      },
      {
        path: '/detallePlanAccionAlumno',
        element: <PageDetallePlanAccionAlumno />
      },
      {
        path: '/solicitarCita',
        element: <PageSolicitarCita />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <GoogleOAuthProvider clientId='358728188523-achb1qm8b68uvhr6437hft062u1dmtns.apps.googleusercontent.com'>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
