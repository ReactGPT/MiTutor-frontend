import axios from 'axios';
import { Services as ServicesProperties } from '../../config'; 
import { Archivo, FileBD, ExtendedFile } from '../types/Archivo';


async function enviarArchivo(file:File,nombre:string,carpeta:string) {    
  try { 
    const formData = new FormData();
    formData.append('file', file, nombre);

    // Enviar el archivo al servidor
    const response = await axios.post(ServicesProperties.BaseUrl+`/api/Archivos/uploadAutomatic?fileName=${nombre}&carpeta=${carpeta}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*'
      }
    });

    console.log('Archivo enviado correctamente al servidor:', response.data, nombre);
  } catch (error) {
    console.error('Error al enviar el archivo al servidor:', error);
  }
}

async function descargarArchivo(nombreFalso:string, nombreReal:string , carpeta:string ) {
  try {
    const response = await axios.get(ServicesProperties.BaseUrl+`/api/Archivos/downloadFalso?fileNameReal=${nombreReal}&fileNameFalso=${nombreFalso}&carpeta=${carpeta}`, {
      responseType: 'blob', // Para recibir la respuesta como un blob (archivo binario)
    });
  //https://localhost:44369/api/Archivos/downloadFalso?fileNameReal=f&fileNameFalso=f&carpeta=f
  //`https://localhost:44369/api/Archivos/downloadFalso?fileNameReal=${nombreReal}&fileNameFalso=${nombreFalso}&carpeta=${carpeta}`
  /*  const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url; 
    link.setAttribute('download', nombreFalso);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);*/
    return response.data;
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
  }
}

async function enviarArchivoBD(archivo: Archivo): Promise<number> {
  try {
    const response = await axios.post(ServicesProperties.BaseUrl+'/insertarArchivoBD', archivo); 
    console.log('Archivo enviado correctamente a la BD:', response.data);
    return response.data.idArchivo; 
  } catch (error) {
    console.error('Error al enviar el archivo a la BD:', error);
    throw error; // Lanza el error para manejarlo en el llamador si es necesario
  }
}


async function listarArchivosBD(idResultado: number, idTipo: number): Promise<ExtendedFile[]> {
  try {
    const response = await axios.get(`${ServicesProperties.BaseUrl}/listarArchivos/${idResultado}/${idTipo}`);
    const archivosData = response.data.data;

    // Mapea los datos recibidos a la estructura de ExtendedFile
    const archivos: ExtendedFile[] = archivosData.map((archivo: any) => {
      const extendedFile: ExtendedFile = new File([], archivo.filesName, { type: archivo.mimeType }) as ExtendedFile;
      extendedFile.nuevo = 0;
      extendedFile.eliminado = archivo.activo ? 0 : 1;
      extendedFile.id_archivo = archivo.filesId;
      extendedFile.nombre = archivo.filesName;

      return extendedFile;
    });

    return archivos;
  } catch (error) {
    console.error('Error al listar archivos:', error);
    throw error; // Lanza el error para manejarlo en el llamador si es necesario
  }
}

export { enviarArchivo, enviarArchivoBD,listarArchivosBD,descargarArchivo};