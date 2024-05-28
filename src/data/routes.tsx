import { RouteObject } from "react-router-dom"
//import PageInicioTutor from "../pages/tutor/inicio/PageInicioTutor"
import PageListadoPlanAccion from '../pages/tutor/listaDeCitas/PageListadoPlanAccion.tsx';
import PageDetallePlanAccion from '../pages/tutor/listaDeCitas/PageDetallePlanAccion.tsx';
import PageResultadoCitaIndividual from '../pages/tutor/resultadoCita/PageResultadoCitaIndividual.tsx';
import PageMiPerfilAlumno from '../pages/alumno/miPerfil/PageMiPerfilAlumno.tsx';
import PageSolicitarAlumno from '../pages/tutor/solicitarTutor/PageSolicitarAlumno.tsx';
import PageListadoPlanAccionAlumno from '../pages/alumno/PlanDeAccion/PageListadoPlanAccionAlumno.tsx';
import PageDetallePlanAccionAlumno from '../pages/alumno/PlanDeAccion/PageDetallePlanAccionAlumno.tsx';
import App from '../App.tsx';
import PageInicioTutor from '../pages/tutor/inicio/PageInicioTutor.tsx';
import PageCalendarioTutor from '../pages/tutor/calendario/PageCalendarioTutor.tsx';
import PageProgramasDeTutoriaTutor from '../pages/tutor/programasDeTutoria/PageProgramasDeTutoriaTutor.tsx';
import PageMiPerfilTutor from '../pages/tutor/miPerfil/PageMiPerfilTutor.tsx';
import PageDetalleProgramaTutoriaTutor from '../pages/tutor/programasDeTutoria/PageDetalleProgramaTutoriaTutor.tsx';
import PageHistoricoDeCitas from '../pages/tutor/listaDeCitas/PageHistoricoDeCitas.tsx';
import PageListaDeCitas from '../pages/tutor/listaDeCitas/PageListaDeCitas.tsx';

import PageProgTutoria from '../pages/coordinador/programasDeTutoria/PageProgTutoria.tsx';
import PageProgramasTutoriaMaestro from '../pages/coordinador/programasDeTutoria/PageProgramasTutoriaMaestro.tsx';

import PageAgregarDisponibilidadTutor from '../pages/tutor/calendario/PageAgregarDisponibilidadTutor.tsx';
import PageDerivacionesHechas from '../pages/tutor/miPerfil/PageDerivacionesHechas.tsx';
import PagePerfilAlumnoTutor from '../pages/tutor/programasDeTutoria/PagePerfilAlumnoTutor.tsx';






type RouterConfig={
    tutor:RouteObject[],
    coordinador:RouteObject[],
    alumno:RouteObject[]
}

export const Routes:RouterConfig={
    tutor:[
        {
          path: '/',
          element: <App/>,
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
              path: '/listadoPlanAccion',
              element: <PageListadoPlanAccion />,
            },
            {
              path: '/detallePlanAccion',
              element: <PageDetallePlanAccion />,
            },
            {
              path: '/PerfilAlumno',
              element:<PageMiPerfilAlumno/>
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
              path: '/listaDeCitas/resultadoCitaIndividual',
              element:<PageResultadoCitaIndividual/>
            },
            {
              path: '/solicitarTutor',
      
              element: <PageSolicitarAlumno idProgram={1}/>
      
            },
            {
              path: '/listadoPlanAccionAlumno',
              element:<PageListadoPlanAccionAlumno/>
            },
            {
              path: '/detallePlanAccionAlumno',
              element:<PageDetallePlanAccionAlumno/>
      
            }
          ],
        },
      ],
    coordinador:[
      {
        path: '/',
        element: <App/>,
        children: [
          {
            path: '/',
            element: <PageInicioTutor />,
          },
          {
            path: '/programasDeTutoriaMaestro',
            element: <PageProgramasTutoriaMaestro />,
          },
          {
            path:'/programasDeTutoriaMaestro/editar',
            element:<PageProgTutoria/>
          },
          {
            path: '/programasDeTutoriaMaestro/nuevo',
            element: <PageProgTutoria />,
          }
        ],
      },
    ],
    alumno:[
      {
        path: '/',
        element: <App/>,
        children: [
          {
            path: '/',
            element: <PageInicioTutor />,
          },
          {
            path: '/PerfilAlumno',
            element:<PageMiPerfilAlumno/>
          },
          {
            path: '/solicitarTutor',
    
            element: <PageSolicitarAlumno idProgram={1}/>
    
          },
          {
            path: '/listadoPlanAccionAlumno',
            element:<PageListadoPlanAccionAlumno/>
          },
          {
            path: '/detallePlanAccionAlumno',
            element:<PageDetallePlanAccionAlumno/>
    
          }
        ],
      },
    ]
}

//const router = createBrowserRouter();