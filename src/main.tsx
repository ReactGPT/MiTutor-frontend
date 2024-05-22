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

import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import PageListadoPlanAccion from './pages/tutor/listaDeCitas/PageListadoPlanAccion.tsx';
import PageDetallePlanAccion from './pages/tutor/listaDeCitas/PageDetallePlanAccion.tsx';
import PageResultadoCitaIndividual from './pages/tutor/resultadoCita/PageResultadoCitaIndividual.tsx';
import PageMiPerfilAlumno from './pages/alumno/miPerfil/PageMiPerfilAlumno.tsx';

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
        path: '/listadoPlanAccion/:id',
        element: <PageDetallePlanAccion />,
      },
      {
        path: '/PerfilAlumno',
        element:<PageMiPerfilAlumno/>
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
        path:'/programasDeTutoriaMaestro/editar',
        element:<PageProgTutoria/>
      },
      {
        path: '/listaDeCitas/resultadoCitaIndividual',
        element:<PageResultadoCitaIndividual/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
  
);
