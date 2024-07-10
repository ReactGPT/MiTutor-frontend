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
  BiBarChartAlt,
  BiSolidWrench
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
import PageEditarFacultad from "../pages/administrador/facultades/PageEditarFacultad.tsx";
import PageEditarUnidadDerivacion from "../pages/administrador/gestionUnidad/PageEditarUnidadDerivacion.tsx";
import PageInstitucion from "../pages/administrador/institucion/PageInstitucion.tsx";
import PageAlumnosSeleccionados from "../pages/coordinador/programasDeTutoria/PageCargarAlumnos/PageAlumnosSeleccionados.tsx";
import PageListadoEstudiantes from "../pages/administrador/gestionUsuarios/PageListadoEstudiantes.tsx";
import PageEstudiante from "../pages/administrador/gestionUsuarios/PageEstudiante.tsx";
import PageCargaMasiva from "../pages/administrador/gestionUsuarios/PageCargaMasiva.tsx";
import TutorDetail from "../pages/tutor/indicadorTutores/TutorDetail.tsx";
import PageResultadoCitaGrupal from '../pages/tutor/resultadoCita/PageResultadoCitaGrupal.tsx';
import AlumnoDetail from "../pages/alumno/indicadorAlumnos/AlumnoDetail.tsx";
import PageMaestroTutores from "../pages/coordinador/MaestroTutores/PageMaestroTutores.tsx";
import { UserPlus } from "../assets/index.ts";
import EspecialidadesPage from "../pages/coordinador/especialidades/Especialidades.tsx";
import PageSolicitudGestionTutor from "../pages/tutor/gestionSolicitudes/PageSolicitudGestion.tsx";
import EspecialidadSingular from "../pages/coordinador/especialidades/EspecialidadSingular.tsx";
import PageGeneralAdmin from "../pages/administrador/general/PageGeneralAdmin.tsx";
import PageFacultadesAdmin from "../pages/administrador/facultades/PageFacultadesAdmin.tsx";
import PageIndicadorAlumnoTutor from "../pages/tutor/indicadorTutores/PageIndicadorAlumnoTutor.tsx";
import PageListadoDerivaciones from "../pages/bienestar/derivaciones/PageListadoDerivaciones.tsx";
import PageDetalleDerivacion from "../pages/bienestar/derivaciones/PageDetalleDerivacion.tsx";
import PageInicioDerivaciones from "../pages/bienestar/derivaciones/PageInicioDerivaciones.tsx";
import PageActualizacionMasivaAlumnos from "../pages/administrador/gestionUsuarios/PageActualizacionMasivaAlumnos.tsx";
import PageMaestroTutoresEsp from "../pages/coordi_esp/MaestroTutores/PageMaestroTutores.tsx";
import PageProgramasTutoriaMaestroEsp from "../pages/coordi_esp/programasDeTutoria/PageProgramasTutoriaMaestro.tsx";
import PageProgTutoriaEsp from "../pages/coordi_esp/programasDeTutoria/PageProgTutoria.tsx";
import PageSolicitudGestionEsp from "../pages/coordi_esp/gestionSolicitudes/PageSolicitudGestion.tsx";

type RouterDetail = {
  pages: RouteObject[];
  navBarLink: SidebarLink[];
};

type RouterConfig = {
  tutor: RouterDetail;
  coordinadorFacultad: RouterDetail;
  coordinadorEspecialidad: RouterDetail;
  alumno: RouterDetail;
  administrador: RouterDetail;
  derivation: RouterDetail;
  bienestar: RouterDetail;
};

export const Routes: RouterConfig = {
  tutor: {
    pages: [
      {
        path: '/',
        element: <PageInicioTutor />,
      },
      {
        path: '/calendarioTutor',
        element: <PageCalendarioTutor />,
      },
      {
        path: '/programasDeTutoriaTutor',
        element: <PageProgramasDeTutoriaTutor />,
      },
      {
        path: '/gestionSolicitudesTutor',
        element: <PageSolicitudGestionTutor />,
      },
      {
        path: '/listaDeCitas',
        element: <PageListaDeCitas />,
      },
      {
        path: '/miPerfilTutor',
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
        path: '/miPerfilTutor/derivaciones',
        element: <PageDerivacionesHechas />
      },
      {
        path: '/listaDeCitas/resultadoCitaIndividual',
        element: <PageResultadoCitaIndividual />
      },
      {
        path: '/IndicadorAlumnoTutor',
        element: <PageIndicadorAlumnoTutor />
      },
      {
        path: '/listaDeCitas/resultadoCitaGrupal',
        element: <PageResultadoCitaGrupal />
        //PageDetalleCitaGrupal
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
        path: '/calendarioTutor',
        icon: <BiCalendar fontSize={32} />,
      },
      {
        key: 'programasDeTutoria',
        label: 'Tipos de Tutoria',
        path: '/programasDeTutoriaTutor',
        icon: <BiCabinet fontSize={32} />,
      },
      {
        key: 'gestionDeSolicitudes',
        label: 'Gestion de Solicitudes',
        path: '/gestionSolicitudesTutor',
        icon: <BiUserCheck fontSize={32} />,
      },
      {
        key: 'listaDeCitas',
        label: 'Lista de Citas',
        path: '/listaDeCitas',
        icon: <BiListUl fontSize={32} />,
      },

      {
        key: 'indicadorAlumnosTutor',
        label: 'Indicador Alumnos',
        path: '/IndicadorAlumnoTutor',
        icon: <BiListUl fontSize={32} />,
      },

      {
        key: 'miPerfil',
        label: 'Mi Perfil',
        path: '/miPerfilTutor',
        icon: <BiUser fontSize={32} />,
      },

    ]
  },
  coordinadorFacultad: {
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
        path: '/tutor-detail',
        element: <TutorDetail />
      }
      ,
      {
        path: '/alumno-detail',
        element: <AlumnoDetail />
      },
      {
        path: '/maestroTutores',
        element: <PageMaestroTutores />
      },
      {
        path: '/especialidades',
        element: <EspecialidadesPage />
      },
      {
        path: '/especialidades/editar',
        element: <EspecialidadSingular />
      },
      {
        path: '/estudiantes',
        element: <PageListadoEstudiantes />
      },
      {
        path: '/estudiantes/detalle',
        element: <PageEstudiante />
      },
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
      },
      {
        key: 'maestroTutores',
        label: 'Asignación Tutores',
        path: '/maestroTutores',
        icon: <UserPlus size={6} />
      },
      {
        key: 'alumnos',
        label: 'Alumnos',
        path: '/estudiantes',
        icon: <PiStudent fontSize={32} />,
      }
    ]
  },
  coordinadorEspecialidad: {
    pages: [
      {
        path: '/',
        element: <PageInicioTutor />,
      },
      {
        path: '/programasDeTutoriaEsp',
        element: <PageProgramasTutoriaMaestroEsp />,
      },
      {
        path: '/programasDeTutoriaMaestroEsp/editar',
        element: <PageProgTutoriaEsp />
      },
      {
        path: '/programasDeTutoriaMaestroEsp/nuevo',
        element: <PageProgTutoriaEsp />,
      },
      {
        path: '/gestionSolicitudesEsp',
        element: <PageSolicitudGestionEsp />,
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
        path: '/tutor-detail',
        element: <TutorDetail />
      }
      ,
      {
        path: '/alumno-detail',
        element: <AlumnoDetail />
      },
      {
        path: '/maestroTutores',
        element: <PageMaestroTutoresEsp />
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
        key: 'programasDeTutoriaEsp',
        label: 'Tipos de Tutoria',
        path: '/programasDeTutoriaEsp',
        icon: <BiCabinet fontSize={32} />,
      },
      {
        key: 'gestionDeSolicitudes',
        label: 'Gestion de Solicitudes',
        path: '/gestionSolicitudesEsp',
        icon: <BiUserCheck fontSize={32} />,
      },
      /*{
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
      },*/
      {
        key: 'maestroTutores',
        label: 'Asignación Tutores',
        path: '/maestroTutores',
        icon: <UserPlus size={6} />
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
        path: '/',
        element: <PageGeneralAdmin />
      },
      {
        path: '/facultades',
        element: <PageFacultadesAdmin />
      },
      {
        path: '/facultades/editarFacultad',
        element: <PageEditarFacultad />
      },
      {
        path: '/facultades/editarFacultad/especialidades/editar',
        element: <EspecialidadSingular />
      },
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
        element: <PageCargaMasiva />
      },
      {
        path: '/estudiantes/cargaMasiva',
        element: <PageCargaMasiva />
      },
      {
        path: '/estudiantes/updateMasivo',
        element: <PageActualizacionMasivaAlumnos />
      },
      {
        path: '/unidades',
        element: <PageUnidadFacultad />
      },
      {
        path: '/unidades/editarUnidadDerivacion',
        element: <PageEditarUnidadDerivacion />
      },
      {
        path: '/institucion',
        element: <PageInstitucion />
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
        key: 'configuracion',
        label: 'Configuración de la Institución',
        path: '/institucion',
        icon: <BiSolidWrench fontSize={32} />,
      },
      {
        key: 'facultades',
        label: 'Facultades',
        path: '/facultades',
        icon: <BiSolidLandmark fontSize={32} />,
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
      },
    ]
  },
  derivation: {
    pages: [
      {
        path: '/',
        element: <PageInicioDerivaciones />
      },
      {
        path: '/derivaciones',
        element: <PageListadoDerivaciones />
      },
      {
        path: '/derivaciones/detalle',
        element: <PageDetalleDerivacion />
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
        key: 'derivaciones',
        label: 'Derivaciones',
        path: '/derivaciones',
        icon: <BiListUl fontSize={32} />,
      },
    ]
  },
  bienestar: {
    pages: [

    ],
    navBarLink: [

    ]
  }
};