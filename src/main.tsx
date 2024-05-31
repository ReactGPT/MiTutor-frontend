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
import { AuthProvider,RouterContextProvider,useRouter } from './context';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import PageListadoPlanAccion from './pages/tutor/listaDeCitas/PageListadoPlanAccion.tsx';
import PageDetallePlanAccion from './pages/tutor/listaDeCitas/PageDetallePlanAccion.tsx';
import PageResultadoCitaIndividual from './pages/tutor/resultadoCita/PageResultadoCitaIndividual.tsx';
import PageMiPerfilAlumno from './pages/alumno/miPerfil/PageMiPerfilAlumno.tsx';

import PageSolicitarAlumno from './pages/tutor/solicitarTutor/PageSolicitarAlumno.tsx';
import PageListadoPlanAccionAlumno from './pages/alumno/PlanDeAccion/PageListadoPlanAccionAlumno.tsx';
import PageDetallePlanAccionAlumno from './pages/alumno/PlanDeAccion/PageDetallePlanAccionAlumno.tsx';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
          <GoogleOAuthProvider clientId='358728188523-achb1qm8b68uvhr6437hft062u1dmtns.apps.googleusercontent.com'>
            <RouterContextProvider/>
          </GoogleOAuthProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
