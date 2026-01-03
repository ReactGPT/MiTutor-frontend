# 🎓 Mi Tutor - Frontend

<div align="center">

![Mi Tutor Logo](https://github.com/user-attachments/assets/5c39c437-63cd-43af-8b12-80ca50eef956)


**Sistema de Gestión de Tutorías Universitarias**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Tecnologías](#-tecnologías)
- [Comenzando](#-comenzando)
  - [Prerequisitos](#prerequisitos)
  - [Instalación](#instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura](#-arquitectura)

---

## 📖 Acerca del Proyecto

**Mi Tutor** es un sistema integral de apoyo a la gestión del proceso de tutoría universitaria, diseñado para facilitar el registro, seguimiento y evaluación de las tutorías académicas. 

El frontend proporciona una interfaz moderna, intuitiva y responsiva que permite: 

- 👨‍🎓 **Estudiantes**: Agendar citas con tutores, hacer seguimiento a su progreso académico y acceder a recursos de apoyo
- 👨‍🏫 **Tutores**:  Gestionar horarios, registrar sesiones de tutoría, dar seguimiento a estudiantes asignados
- 👔 **Administradores**: Configurar modelos de tutoría, gestionar usuarios, generar reportes e indicadores

### 🎯 Objetivo

Fortalecer el acompañamiento y bienestar del estudiante mediante una solución flexible y adaptable que puede ser utilizada por cualquier universidad para optimizar su proceso de tutorías.

---

## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- Autenticación mediante Google OAuth 2.0
- Gestión de roles y permisos (Estudiante, Tutor, Administrador)
- Rutas protegidas según rol de usuario

### 📅 Gestión de Citas
- Calendario interactivo para visualización de citas
- Sistema de agendamiento de tutorías
- Notificaciones y recordatorios
- Historial de sesiones realizadas

### 📊 Dashboard y Reportes
- Visualización de métricas e indicadores clave
- Gráficos interactivos con Recharts
- Exportación de datos a Excel y PDF
- Reportes personalizados según rol

### 👥 Gestión de Usuarios
- Perfiles de estudiantes y tutores
- Asignación de tutores a estudiantes
- Seguimiento individualizado
- Gestión de grupos y cohortes

### 🎨 Interfaz de Usuario
- Diseño moderno con Tailwind CSS y Ant Design
- Totalmente responsivo (Mobile-first)
- Modo oscuro/claro
- Componentes reutilizables con Flowbite React

### 📈 Análisis y Seguimiento
- Indicadores de desempeño académico
- Seguimiento de asistencia
- Evaluación de satisfacción
- Alertas tempranas

---

## 📸 Capturas de Pantalla

### Dashboard Principal
![Dashboard](https://cdn.discordapp.com/attachments/1301045138868670495/1456875400675332117/image.png?ex=6959f472&is=6958a2f2&hm=6d0d64257c439726c5bebd2c79d702eafdc781a7038e3add6c7f5e4deae24195&)

### Calendario de Tutorías
![Calendario](https://cdn.discordapp.com/attachments/1301045138868670495/1456875524092592404/image.png?ex=6959f490&is=6958a310&hm=5c24c324e39fbb463b2563f879bb8e3e35553f09690bf2eee47e32cb65df23fd&)

### Gestión de Solicitudes de Estudiantes
![Estudiantes](https://cdn.discordapp.com/attachments/1301045138868670495/1456876910163267655/image.png?ex=6959f5da&is=6958a45a&hm=f5f84c7b81e925007363ed07f41de7a78d322b6fec763342bf51fa344ada4cc5&)

### Reportes y Análisis
![Reportes](https://cdn.discordapp.com/attachments/1301045138868670495/1456876255503712425/image.png?ex=6959f53e&is=6958a3be&hm=d16b086b311389764daafa67b5531ad012091c22bd98edcd46aa7a01a95e2adf&)

---

## 🛠️ Tecnologías

### Core
- **[React 18.3](https://reactjs.org/)** - Librería de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Vite](https://vitejs.dev/)** - Build tool de alto rendimiento
- **[React Router DOM](https://reactrouter.com/)** - Enrutamiento

### Estado y Datos
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Gestión de estado global
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[React Query](https://tanstack.com/query)** - Gestión de estado del servidor

### UI y Estilos
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de utilidades CSS
- **[Ant Design](https://ant.design/)** - Biblioteca de componentes
- **[Flowbite React](https://flowbite-react.com/)** - Componentes UI
- **[Headless UI](https://headlessui.com/)** - Componentes accesibles
- **[Heroicons](https://heroicons.com/)** - Iconos

### Visualización de Datos
- **[Recharts](https://recharts.org/)** - Gráficos y visualizaciones
- **[AG Grid](https://www.ag-grid.com/)** - Tablas avanzadas de datos
- **[React Big Calendar](https://github.com/jquense/react-big-calendar)** - Calendario de eventos

### Utilidades
- **[Day.js](https://day.js.org/)** - Manipulación de fechas
- **[date-fns](https://date-fns.org/)** - Utilidades de fechas
- **[Papa Parse](https://www.papaparse.com/)** - Parser de CSV
- **[jsPDF](https://github.com/parallax/jsPDF)** - Generación de PDFs
- **[html2canvas](https://html2canvas.hertzen.com/)** - Capturas de pantalla
- **[XLSX](https://github.com/SheetJS/sheetjs)** - Manipulación de Excel

### Testing
- **[Vitest](https://vitest.dev/)** - Framework de testing
- **[jsdom](https://github.com/jsdom/jsdom)** - Simulación del DOM
- **[Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter)** - Mocking de peticiones

### Autenticación
- **[@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)** - Google OAuth 2.0

---

## 🚀 Comenzando

### Prerequisitos

Asegúrate de tener instalado: 

- **Node.js** >= 18.x
- **npm** >= 9.x o **yarn** >= 1.22.x

```bash
# Verificar versiones
node --version
npm --version
```

### Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/ReactGPT/MiTutor-frontend. git
cd MiTutor-frontend
```

2. **Instala las dependencias**

```bash
npm install
# o
yarn install
```

3. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto: 

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones (ver sección [Variables de Entorno](#variables-de-entorno))

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
```

5. **Abre tu navegador**

Navega a [http://localhost:5173](http://localhost:5173)

---

## 📁 Estructura del Proyecto

```
MiTutor-frontend/
├── public/                 # Archivos estáticos
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── assets/            # Recursos (imágenes, fuentes, etc.)
│   ├── components/        # Componentes reutilizables
│   │   ├── common/       # Componentes comunes (Botones, Inputs, etc.)
│   │   ├── layouts/      # Componentes de layout
│   │   └── features/     # Componentes específicos de funcionalidades
│   ├── context/          # Context API de React
│   ├── data/             # Datos mock y constantes
│   ├── layouts/          # Layouts principales de la aplicación
│   ├── login/            # Componentes de autenticación
│   ├── pages/            # Páginas/Vistas de la aplicación
│   │   ├── Dashboard/
│   │   ├── Estudiantes/
│   │   ├── Tutores/
│   │   ├── Citas/
│   │   └── Reportes/
│   ├── store/            # Redux store y slices
│   │   ├── slices/
│   │   └── store.ts
│   ├── utils/            # Funciones de utilidad
│   │   ├── api.ts       # Configuración de Axios
│   │   ├── helpers.ts   # Funciones helper
│   │   └── validators.ts
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   ├── config.ts         # Configuraciones globales
│   └── index.css         # Estilos globales
├── .env                   # Variables de entorno (no versionado)
├── .env.example          # Ejemplo de variables de entorno
├── .eslintrc.cjs         # Configuración de ESLint
├── .gitignore            # Archivos ignorados por Git
├── index.html            # HTML principal
├── package.json          # Dependencias y scripts
├── postcss.config.js     # Configuración de PostCSS
├── tailwind.config.js    # Configuración de Tailwind
├── tsconfig.json         # Configuración de TypeScript
├── vite. config.ts        # Configuración de Vite
├── vitest.config.ts      # Configuración de Vitest
└── README.md             # Este archivo
```

---

## 🏗️ Arquitectura

### Patrón de Diseño

El proyecto sigue una arquitectura basada en:

- **Component-Based Architecture**: Componentes modulares y reutilizables
- **Container/Presenter Pattern**: Separación de lógica y presentación
- **Feature-Based Organization**: Organización por características funcionales
- **Redux Toolkit**: Gestión de estado predecible

### Flujo de Datos

```
Usuario → Componente → Action → Reducer → Store → Componente → UI
                          ↓
                        API Call (Axios)
                          ↓
                       Backend
```

### Gestión de Estado

- **Estado Global**: Redux Toolkit para autenticación, usuario, configuraciones
- **Estado Local**: React Hooks (useState, useReducer) para estado de componentes
- **Estado del Servidor**:  Axios + React Query para caché y sincronización

### Routing

```
/                          → Página de inicio/login
/dashboard                 → Dashboard principal
/estudiantes               → Listado de estudiantes
/estudiantes/:id           → Perfil de estudiante
/tutores                   → Listado de tutores
/tutores/:id               → Perfil de tutor
/citas                     → Calendario y gestión de citas
/citas/nueva               → Crear nueva cita
/reportes                  → Reportes y análisis
/configuracion             → Configuración del sistema
/perfil                    → Perfil del usuario actual
```

---

Hecho con ❤️ por el equipo
