import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import PageInicioTutor from './pages/tutor/inicio/PageInicioTutor.tsx';
import PageCalendarioTutor from './pages/tutor/calendario/PageCalendarioTutor.tsx';
import PageListaDeCitasTutor from './pages/tutor/listaDeCitas/PageListaDeCitasTutor.tsx';
//import PageProgramasDeTutoriaTutor from './pages/tutor/programasDeTutoria/PageProgramasDeTutoriaTutor.tsx';
import PageMiPerfilTutor from './pages/tutor/miPerfil/PageMiPerfilTutor.tsx';
import PageProgTutoria from './pages/coordinador/programasDeTutoria/PageProgTutoria.tsx';
import PageProgramasTutoriaMaestro from './pages/coordinador/programasDeTutoria/PageProgramasTutoriaMaestro.tsx';

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
        path: '/programasDeTutoriaMaestro',
        element: <PageProgramasTutoriaMaestro />,
      },
      {
        path: '/listaDeCitas',
        element: <PageListaDeCitasTutor />,
      },
      {
        path: '/miPerfil',
        element: <PageMiPerfilTutor />,
      },
      {
        path: '/programasDeTutoriaMaestro/nuevo',
        element: <PageProgTutoria />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

/**
 * children:[
          {
            path:'detalles:id',
            element:<PageProgTutoria/>
          },
          {
            path:'nuevo',
            element:<PageProgTutoria/>
          }
        ],
 * 
 * 
 */
