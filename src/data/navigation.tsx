import {
  BiCabinet,
  BiCalendar,
  BiHome,
  BiListUl,
  BiUser
} from "react-icons/bi";

import { SidebarLink } from "../store/types/SidebarLink";

export const DASHBOARD_SIDEBAR_LINKS: SidebarLink[] = [
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
];