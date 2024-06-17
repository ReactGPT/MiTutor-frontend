import { Navigate, RouteObject } from "react-router-dom";
import { SidebarLink } from "../store/types/SidebarLink.ts";
import {
  BiCabinet,
  BiCalendar,
  BiHome,
  BiListUl,
  BiUser,
  BiSolidLandmark,
  BiUserCheck,
  BiBarChart,
  BiBarChartAlt  
} from "react-icons/bi";
import { PiStudent } from "react-icons/pi";

import PageListadoPlanAccion from '../pages/tutor/listaDeCitas/PageListadoPlanAccion.tsx';
import PageDetallePlanAccion from '../pages/tutor/listaDeCitas/PageDetallePlanAccion.tsx';
import PageResultadoCitaIndividual from '../pages/tutor/resultadoCita/PageResultadoCitaIndividual.tsx';
import PageMiPerfilAlumno from '../pages/alumno/miPerfil/PageMiPerfilAlumno.tsx';
import PageSolicitarAlumno from '../pages/tutor/solicitarTutor/PageSolicitarAlumno.tsx';
import PageListadoPlanAccionAlumno from '../pages/alumno/PlanDeAccion/PageListadoPlanAccionAlumno.tsx';
import PageDetallePlanAccionAlumno from '../pages/alumno/PlanDeAccion/PageDetallePlanAccionAlumno.tsx';
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
import PageSolicitarCita from "../pages/alumno/misTutorias/PageSolicitarCita.tsx";
import PageListaDeCitasAlumno from '../pages/alumno/listaDeCitasAlumno/PageListaDeCitasAlumno.tsx';
import PageResultadoCitaIndividualAlumno from '../pages/alumno/resultadoCita/PageResultadoCitaIndividualAlumno.tsx';
import PageListaDeTutorias from "../pages/alumno/misTutorias/PageListaDeTutorias.tsx";
import PageSolicitudGestion from "../pages/coordinador/gestionSolicitudes/PageSolicitudGestion.tsx";
import PageCalendarioAlumno from "../pages/alumno/calendario/PageCalendarioAlumno.tsx";
import PageDetalleDeTutoria from "../pages/alumno/misTutorias/PageDetalleDeTutoria.tsx";
import PageIndicadorAlumno from "../pages/alumno/indicadorAlumnos/PageIndicadorAlumno.tsx";
import PageIndicadorTutor from "../pages/tutor/indicadorTutores/PageIndicadorTutor.tsx";
import PageListadoUsuarios from "../pages/administrador/gestionUsuarios/PageListadoUsuarios.tsx";
import PageUsuario from "../pages/administrador/gestionUsuarios/PageUsuario.tsx";
import PageUnidadFacultad from "../pages/administrador/gestionUnidad/PageUnidadFacultad.tsx";
import PageEditarFacultad from "../pages/administrador/gestionUnidad/PageEditarFacultad.tsx";
import PageEditarUnidadDerivacion from "../pages/administrador/gestionUnidad/PageEditarUnidadDerivacion.tsx";
import PageAlumnosSeleccionados from "../pages/coordinador/programasDeTutoria/PageCargarAlumnos/PageAlumnosSeleccionados.tsx";
import PageListadoEstudiantes from "../pages/administrador/gestionUsuarios/PageListadoEstudiantes.tsx";
import PageEstudiante from "../pages/administrador/gestionUsuarios/PageEstudiante.tsx";
import PageCargaMasiva from "../pages/administrador/gestionUsuarios/PageCargaMasiva.tsx";
import TutorDetail from "../pages/tutor/indicadorTutores/TutorDetail.tsx";
import PageResultadoCitaGrupal from '../pages/tutor/resultadoCita/PageResultadoCitaGrupal.tsx';
import AlumnoDetail from "../pages/alumno/indicadorAlumnos/AlumnoDetail.tsx";

type RouterDetail = {
  pages: RouteObject[];
  navBarLink: SidebarLink[];
};

type RouterConfig = {
  tutor: RouterDetail;
  coordinador: RouterDetail;
  alumno: RouterDetail;
  administrador: RouterDetail;
};

export const Routes: RouterConfig = {
  tutor: {
    pages: [
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
        path: "/programasDeTutoria/detalle-programa/alumno/historicoCitas",
        element: <PageHistoricoDeCitas />
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
        path: '/calendario/agregarDisponibilidad',
        element: <PageAgregarDisponibilidadTutor />,
      },
      {
        path: '/miPerfil/derivaciones',
        element: <PageDerivacionesHechas />
      },
      {
        path: '/listaDeCitas/resultadoCitaIndividual',
        element: <PageResultadoCitaIndividual /> 
      },
      {
        path: '/listaDeCitas/resultadoCitaGrupal',
        element: <PageResultadoCitaGrupal />
        //PageDetalleCitaGrupal
      },

      {
        path: '*',
        element: <Navigate to="/" />
      }

    ],
    navBarLink: [
      {
        key: 'inicio',
        label: 'Inicio',
        path: '/',
        icon: <BiHome fontSize={32} />,
      },
      {
        key: 'calendario',
        label: 'Calendario',//Pendiente
        path: '/calendario',
        icon: <BiCalendar fontSize={32} />,
      },
      {
        key: 'programasDeTutoria',
        label: 'Tipos de Tutoria',
        path: '/programasDeTutoria',
        icon: <BiCabinet fontSize={32} />,
      },
      {
        key: 'listaDeCitas',
        label: 'Lista de Citas',
        path: '/listaDeCitas',
        icon: <BiListUl fontSize={32} />,
      },
      {
        key: 'miPerfil',
        label: 'Mi Perfil',
        path: '/miPerfil',
        icon: <BiUser fontSize={32} />,
      },

    ]
  },
  coordinador: {
    pages: [
      {
        path: '/',
        element: <PageInicioTutor />,
      },
      {
        path: '/programasDeTutoria',
        element: <PageProgramasTutoriaMaestro />,
      },
      {
        path: '/programasDeTutoriaMaestro/editar',
        element: <PageProgTutoria />
      },
      {
        path: '/programasDeTutoriaMaestro/nuevo',
        element: <PageProgTutoria />,
      },
      {
        path: '/gestionSolicitudes',
        element: <PageSolicitudGestion />,
      },
      {
        path: '/indicadorAlumno',
        element: <PageIndicadorAlumno />
      },
      {
        path: '/indicadorTutor',
        element: <PageIndicadorTutor />
      },
      {
        path: '/alumnosSeleccionados',
        element: <PageAlumnosSeleccionados />,
      },
      {
        path: '*',
        element: <Navigate to="/" />
      },
      {
        path: '/tutor-detail',
        element:<TutorDetail/> 
      }
      ,
      {
        path: '/alumno-detail',
        element:<AlumnoDetail/> 
      }
    ],
    navBarLink: [
      {
        key: 'inicio',
        label: 'Inicio',
        path: '/',
        icon: <BiHome fontSize={32} />,
      },
      {
        key: 'programasDeTutoria',
        label: 'Tipos de Tutoria',
        path: '/programasDeTutoria',
        icon: <BiCabinet fontSize={32} />,
      },
      {
        key: 'gestionDeSolicitudes',
        label: 'Gestion de Solicitudes',
        path: '/gestionSolicitudes',
        icon: <BiUserCheck fontSize={32} />,
      },
      {
        key: 'especialidades',
        label: 'Especialidades',
        path: '/especialidades',//Pendiente agregar
        icon: <BiListUl fontSize={32} />,
      },
      {
        key: 'indicadorAlumno',
        label: 'Indicador Alumno',
        path: '/indicadorAlumno',
        icon: <BiBarChart fontSize={32} />,
      },
      {
        key: 'indicadorTutor',
        label: 'Indicador Tutor',
        path: '/indicadorTutor',
        icon: <BiBarChartAlt fontSize={32} />,
      }
    ]
  },
  alumno: {
    pages: [
      {
        path: "/",
        element: <PageInicioTutor />,
      },
      {
        path: "/calendario",
        element: <PageCalendarioAlumno />
      },
      {
        path: "/misTutorias",
        element: <PageListaDeTutorias />
      },
      {
        path: "/misTutorias/detalle",
        element: <PageDetalleDeTutoria />
      },
      {
        path: "/miPerfil",
        element: <PageMiPerfilAlumno />
      },
      {
        path: "/solicitarTutor",
        element: <PageSolicitarAlumno />

      },
      {
        path: "/misTutorias/detalle/planesDeAccion",
        element: <PageListadoPlanAccionAlumno />
      },
      {
        path: "/misTutorias/detalle/listadoPlanAccionAlumno/detalle",
        element: <PageDetallePlanAccionAlumno />

      },
      {
        path: '/misTutorias/detalle/solicitarCita',
        element: <PageSolicitarCita />
      },
      {
        path: '/listaDeCitasAlumno',
        element: <PageListaDeCitasAlumno />
      },
      {
        path: '/listaDeCitasAlumno/detalleCitaAlumno',
        element: <PageResultadoCitaIndividualAlumno />
      }, {
        path: '*',
        element: <Navigate to="/" />
      }

    ],
    navBarLink: [
      {
        key: 'inicio',
        label: 'Inicio',
        path: '/',
        icon: <BiHome fontSize={32} />,
      },
      {
        key: 'calendario',
        label: 'Calendario',
        path: '/calendario',
        icon: <BiCalendar fontSize={32} />,
      },
      {
        key: 'misTutorias',
        label: 'Mis Tutorías',
        path: '/misTutorias',
        icon: <BiCabinet fontSize={32} />,
      },
      {
        key: 'citas',
        label: 'Citas',
        path: '/listaDeCitasAlumno',
        icon: <BiListUl fontSize={32} />,
      },
      {
        key: 'miPerfil',
        label: 'Mi Perfil',
        path: '/miPerfil',
        icon: <BiUser fontSize={32} />,
      }
    ]
  },
  administrador: {
    pages: [
      {
        path: '/usuarios',
        element: <PageListadoUsuarios />
      },
      {
        path: '/usuarios/nuevo',
        element: <PageUsuario />
      },
      {
        path: '/usuarios/detalle',
        element: <PageUsuario />
      },
      {
        path: '/estudiantes',
        element: <PageListadoEstudiantes />
      },
      {
        path: '/estudiantes/detalle',
        element: <PageEstudiante />
      },
      {
        path: '/estudiantes/nuevo',
        element: <PageEstudiante />
      },
      {
        path: '/usuarios/cargaMasiva',
        element: <PageCargaMasiva/>
      },
      {
        path: '/unidades',
        element: <PageUnidadFacultad/>
      },
      {
        path: '/unidades/editarFacultad',
        element: <PageEditarFacultad/>
      },
      {
        path: '/unidades/editarUnidadDerivacion',
        element: <PageEditarUnidadDerivacion/>
      },
      {
        path: '*',
        element: <Navigate to="/" />
      }
    ],
    navBarLink: [
      {
        key: 'general',
        label: 'General',
        path: '/*',//Pendiente agregar
        icon: <BiCabinet fontSize={32} />,
      },
      {
        key: 'unidades',
        label: 'Unidades',
        path: '/unidades',//Pendiente agregar
        icon: <BiSolidLandmark fontSize={32} />,
      },
      {
        key: 'alumnos',
        label: 'Alumnos',
        path: '/estudiantes',
        icon: <PiStudent fontSize={32} />,
      },
      {
        key: 'usuarios',
        label: 'Usuarios',
        path: '/usuarios',
        icon: <BiUser fontSize={32} />,
      }
    ]
  }
};