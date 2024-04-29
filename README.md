# Guía para clonar y ejecutar el proyecto

## Clonar el repositorio

1. Abre tu terminal o línea de comandos.

2. Utiliza el siguiente comando para clonar el repositorio:

```
git clone git@github.com:ReactGPT/MiTutor-frontend.git
```

3. Una vez que el repositorio se haya clonado correctamente, accede al directorio del proyecto utilizando:

```
cd MiTutor-frontend
```

## Instalar dependencias

1. Una vez dentro del directorio del proyecto, ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```
npm install
```

Este comando leerá el archivo `package.json` del proyecto y descargará todas las dependencias listadas en él.

## Ejecutar el proyecto localmente

1. Después de instalar las dependencias, puedes iniciar el servidor de desarrollo local con el siguiente comando:

```
npm run dev
```

Este comando iniciará el servidor de desarrollo de React en la URL `http://localhost:5173/`.

## Detener el servidor

1. Para detener el servidor de desarrollo, puedes presionar `Ctrl + C` en la terminal donde se está ejecutando el servidor. Esto detendrá el servidor y liberará el puerto `5173`.
