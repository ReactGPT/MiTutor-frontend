import { useState } from 'react';
import { enviarArchivo, enviarArchivoBD, listarArchivosBD, descargarArchivo } from '../services/archivos';
import { Archivo, ExtendedFile, FileBD } from '../types/Archivo';

type ArchivosHooksReturn = { 
  loadingServidor: boolean;
  error: any;
  enviarArchivoServidor: (file: File, nombre: string, carpeta: string) => Promise<void>;
  descargarArchivoServidor: (nombreFalso: string, nombreReal: string, carpeta: string) => Promise<void>;
};

function useArchivos(): ArchivosHooksReturn { 
    const [loadingServidor, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const enviarArchivoServidor = async (file: File, nombre: string, carpeta: string) => {
        try {
            setLoading(true);
            setError(null);
            await enviarArchivo(file, nombre, carpeta); 
            setLoading(false);
        } catch (error) {
            setError("Error en useArchivos");
            setLoading(false);
        }
    }
 

    const descargarArchivoServidor = async (nombreFalso: string, nombreReal: string, carpeta: string) => {
        try {
          setLoading(true);
          setError(null);
          await descargarArchivo(nombreFalso, nombreReal, carpeta);
          setLoading(false);
        } catch (error) { 
          setLoading(false);
        }
      }

    return { loadingServidor, error, enviarArchivoServidor, descargarArchivoServidor};
}

type ArchivosBDHooksReturn = { 
    loading: boolean;
    error: any;
    enviarArchivoBd: (file: Archivo) => Promise<number>;
    archivosBD: ExtendedFile[]; 
    fetchArchivosBD: (idResultado: number, idTipo: number) => Promise<void>; 
    //setArchivosBD: (archivos: ExtendedFile[]) => void;
    setArchivosBD: React.Dispatch<React.SetStateAction<ExtendedFile[]>>;
};
  
function useArchivosDB(): ArchivosBDHooksReturn { 
    const [archivosBD, setArchivosBD] = useState<ExtendedFile[]>([]); 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
 
    async function enviarArchivoBd(file: Archivo) {
        try {
            setLoading(true);
            setError(null);
            const idArchivo = await enviarArchivoBD(file);  
            file.filesId = idArchivo;  
            setLoading(false);
            return idArchivo;
        } catch (error) {
            setError("Error en useArchivos");
            setLoading(false);
            throw error;
        }
    }

    async function fetchArchivosBD(idResultado: number, idTipo: number){
        try {
          setLoading(true);
          setError(null);
          const archivos = await listarArchivosBD(idResultado, idTipo);
          // Descargar contenido para cada archivo
          const archivosConContenido = await Promise.all(
            archivos.map(async (archivo) => {
              const blobArchivo = await descargarArchivo(archivo.nombre, archivo.id_archivo.toString(), 'archivosCita');
              const extendedFile: ExtendedFile = new File([blobArchivo], archivo.nombre) as ExtendedFile;
              extendedFile.nuevo = archivo.nuevo;
              extendedFile.eliminado = archivo.eliminado;
              extendedFile.id_archivo = archivo.id_archivo;
              return extendedFile;
            })
          );
          

          setArchivosBD(archivosConContenido);
          console.log("archivos seteados ALUMNO",archivosBD)  
          setLoading(false);
        } catch (error) {
          setError("Error en listarArchivosBD");
          setLoading(false);
          throw error;  
        }
      }
 
    return { archivosBD, loading, error, enviarArchivoBd, fetchArchivosBD, setArchivosBD };
}

type ArchivosOtrosHooksReturn = { 
  loading2: boolean;
  error: any;
  enviarArchivoOtros: (file: Archivo) => Promise<number>;
  archivosOtros: ExtendedFile[]; 
  fetchArchivosOtros: (idResultado: number, idTipo: number) => Promise<void>; 
  setArchivosOtros: React.Dispatch<React.SetStateAction<ExtendedFile[]>>;
};

function useArchivosOtros(): ArchivosOtrosHooksReturn { 
  const [archivosOtros, setArchivosOtros] = useState<ExtendedFile[]>([]); 
  const [loading2, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function enviarArchivoOtros(file: Archivo) {
      try {
          setLoading(true);
          setError(null);
          const idArchivo = await enviarArchivoBD(file);  // Reemplaza con la función específica para otros archivos si es diferente
          file.filesId = idArchivo;  
          setLoading(false);
          return idArchivo;
      } catch (error) {
          setError("Error en useArchivosOtros");
          setLoading(false);
          throw error;
      }
  }

  async function fetchArchivosOtros(idResultado: number, idTipo: number){
      try {
        setLoading(true);
        setError(null);
        const archivos = await listarArchivosBD(idResultado, idTipo);  // Reemplaza con la función específica si es diferente
        // Descargar contenido para cada archivo
        const archivosConContenido = await Promise.all(
          archivos.map(async (archivo) => {
            const blobArchivo = await descargarArchivo(archivo.nombre, archivo.id_archivo.toString(), 'archivosCita');
            const extendedFile: ExtendedFile = new File([blobArchivo], archivo.nombre) as ExtendedFile;
            extendedFile.nuevo = archivo.nuevo;
            extendedFile.eliminado = archivo.eliminado;
            extendedFile.id_archivo = archivo.id_archivo;
            return extendedFile;
          })
        );
        
        setArchivosOtros(archivosConContenido);
        console.log("archivos seteados prfoe",archivosConContenido);
        setLoading(false);
      } catch (error) {
        setError("Error en listarArchivosOtros");
        setLoading(false);
        throw error;  
      }
    }

  return { archivosOtros, loading2, error, enviarArchivoOtros, fetchArchivosOtros, setArchivosOtros };
}

export {useArchivos, useArchivosDB, useArchivosOtros};
