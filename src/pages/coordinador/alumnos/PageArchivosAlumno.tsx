import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { FaDownload, FaTrashAlt } from 'react-icons/fa';
import { Button } from '../../../components';
import { Document, Page,pdfjs } from 'react-pdf';
import ModalResultadoCita from '../../../components/Tutor/ModalResultadoCita';
import { useArchivos, useArchivosDB } from '../../../store/hooks/useArchivos';
import { ArchivoStudent, ExtendedFile } from '../../../store/types/Archivo';
import { enviarArchivoAlumnoBD } from '../../../store/services/archivos';
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../../../context/UsuarioNuevo';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { Services as ServicesProperties } from '../../../config'; 
import SearchBar from './SearchBar';
import SimpleSearchInput from '../../../components/SimpleSearchInput';
import { useAuth } from '../../../context';
import { getTutorId } from '../../../store/hooks/RolesIdTutor'; 
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; 
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Ruta al worker de PDF.js, puedes usar una CDN o una ruta local
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Resto de la configuración de tu aplicación, como React Router, etc.


const PageArchivosAlumnos: React.FC = () => {
  const { state } = useLocation();
  const { userDataId, userName } = state; 
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
   const [pdfPreview, setPreviewPdf] = useState<boolean>(false);
  const [txtContent, setTxtContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState<ExtendedFile[]>([]);
  
  const { enviarArchivoServidor,loadingServidor } = useArchivos();
  const { fetchArch_AlumnosBD, archivosBD, setArchivosBD, loading } = useArchivosDB();  
  const [ archivosBDCopia, setArchivosBDCopia] = useState<ExtendedFile[]>([]);

  const { userData:userLogin } = useAuth();   
  //const isTutor = getTutorId(userLogin);
 
  const location = useLocation(); 
  const isFromArchivos = location.pathname.includes('/programasDeTutoria/detalle-programa/alumno/archivos');
  const isTutor = isFromArchivos ? 1 : 0; 

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFilteredFiles(archivosBDCopia);
  }, [archivosBDCopia]);

  //CARGAR ARCHIVOS
  useEffect(() => {  
    fetchArch_AlumnosBD(userDataId); 
   }, [userDataId]);

  useEffect(() => { 
    if (archivosBD) {
      const archivosBDCopia2: ExtendedFile[] = archivosBD.map(file => {
        const copiedFile: ExtendedFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified
        }) as ExtendedFile;
       
        copiedFile.nuevo = file.nuevo;
        copiedFile.eliminado = file.eliminado;
        copiedFile.id_archivo = file.id_archivo; 
        copiedFile.date = file.date;
        return copiedFile;
      }); 
      setArchivosBDCopia([...archivosBDCopia2]);
    }  
  }, [archivosBD]);
  
  //LO QUE IRIA EN EL MODAL
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => {
        // Clonamos los archivos y agregamos la propiedad 'nuevo'
        const extendedFile: ExtendedFile = Object.assign(file, {
          nuevo: 1, eliminado:0, id_archivo: 0,
          nombre:file.name, date: new Date().toISOString().slice(0, 10)
        });
        return extendedFile;
      });
  
      setArchivosBDCopia(prevFiles => {
        const updatedFiles = prevFiles.map(existingFile => {
          const match = newFiles.find(newFile =>
            existingFile.name === newFile.name
          ); 

          if (match) { 
            existingFile.eliminado=0; 
          } 
          return existingFile;
        });
  
        // Filtramos los archivos que no están en prevFiles
        const uniqueNewFiles = newFiles.filter(newFile =>
          !prevFiles.some(existingFile =>
            existingFile.name === newFile.name 
          )
        );
  
        console.log('Files added or updated:', [...updatedFiles, ...uniqueNewFiles]);
        return [...updatedFiles, ...uniqueNewFiles];
      });
    }
  };

  const handleFileDelete = (fileToDelete: ExtendedFile) => {
    setArchivosBDCopia(prevFiles =>
      prevFiles.map(file => { 
        if (file.name === fileToDelete.name) {
          fileToDelete.eliminado = 1;
          return fileToDelete;
        }
        return file;
      })
    );
  };
  
  const handleFileDownload = (file: ExtendedFile) => {
    try {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  const triggerFileInput = () => {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    input.value = ''; // Limpiar el valor del input
    input.click();
  };

  //ARCHIVOS A BD-SERV
  const handleCancelar = () => {
    setEnableAttendance(!enableAttendance); 
    const archivosBDCopia2: ExtendedFile[] = archivosBD.map(file => {
      // Crear una copia profunda de cada objeto ExtendedFile
      const copiedFile: ExtendedFile = new File([file], file.name, {
        type: file.type,
        lastModified: file.lastModified
      }) as ExtendedFile;
    
      // Copiar las propiedades adicionales
      copiedFile.nuevo = file.nuevo;
      copiedFile.eliminado = file.eliminado;
      copiedFile.id_archivo = file.id_archivo;
      copiedFile.date = file.date;
      return copiedFile;
    });
    setArchivosBDCopia([...archivosBDCopia2]); 
  
  }; 

  const handleGuardar = async () => {
    setIsModalOpen(!isModalOpen); 
    setEnableAttendance(!enableAttendance);  
    
    // Enviar archivos si hay archivos seleccionados
    if (archivosBDCopia.length > 0) {
      try {
        console.log("ARCHIVOS FINALES",archivosBDCopia);
        // Seleccionar archivos a guardar
        const filesToSend = archivosBDCopia.filter(file => file.nuevo === 1 && file.eliminado === 0);
        // Seleccionar archivos a eliminar
        const filesToDelete = archivosBDCopia.filter(file => file.nuevo === 0 && file.eliminado === 1);
        // Seleccionar archivos a reactivar
        const filesToActive = archivosBDCopia.filter(file => file.nuevo === 0 && file.eliminado === 0);

        //INSERTAR ARCHIVOS ALUMNOS
        for (const file of filesToSend) {
          //creo un tipo archivo
          const archivo:ArchivoStudent={  
              filesId: 0,
              filesName: file.name,
              studentId: userDataId,
              privacyTypeId: 1,
              date: new Date().toISOString()
          }
          const idArchivo = await enviarArchivoAlumnoBD(archivo); // Espera a que se complete enviarArchivoBd
          // Enviar archivo al servidor
          await enviarArchivoServidor(file, idArchivo.toString(), 'archivosAlumno').then(() => {
            // Actualizar el estado del archivo en archivosBD
            file.id_archivo=idArchivo; 
            }).catch(error => {
                console.error('Error al enviar archivo al servidor:', error);
            });
        }

        for (const file of filesToDelete) {
          try {
            await eliminarArchivo(file.id_archivo);
            console.log(`Archivo eliminado correctamente: ${file.name}`);
          } catch (error) {
            console.error(`Error al eliminar el archivo ${file.name}:`, error);
          }
        }

        for (const file of filesToActive) {
          try {
            await activarArchivo(file.id_archivo);
            console.log(`Archivo activado correctamente: ${file.name}`);
          } catch (error) {
            console.error(`Error al eliminar el archivo ${file.name}:`, error);
          }
        }

        const updatedArchivosBD: ExtendedFile[] = archivosBDCopia.map(file => {
          const copiedFile: ExtendedFile = new File([file], file.name, {
            type: file.type,
            lastModified: file.lastModified
          }) as ExtendedFile;
        
          // Copiar las propiedades adicionales
          copiedFile.nuevo = 0;
          copiedFile.eliminado = file.eliminado;
          copiedFile.id_archivo = file.id_archivo;
          copiedFile.nombre = file.nombre;  // Asegúrate de copiar esta propiedad también
          copiedFile.date = file.date;
          return copiedFile;
        });

          // Actualizar el estado de archivosBD
          setArchivosBD([...updatedArchivosBD]);
        console.log('Archivos enviados correctamente');  
      } catch (error) {
        console.error('Error al enviar archivos:', error);
      }
    }
  }

  async function eliminarArchivo(idArchivo: number) {
    try {
        const response = await axios.put(ServicesProperties.BaseUrl+`/eliminarArchivo?fileId=${idArchivo}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar el archivo:', error);
        throw error; // Re-lanza el error para manejarlo en el lugar donde se llama a esta función
    }
  }

  async function activarArchivo(idArchivo: number) {
    try {
        const response = await axios.put(ServicesProperties.BaseUrl+`/reactivarArchivo?fileId=${idArchivo}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar el archivo:', error);
        throw error; // Re-lanza el error para manejarlo en el lugar donde se llama a esta función
    }
  }

  const [enableAttendance, setEnableAttendance] = useState<boolean | undefined>(undefined);
  
  //FILTRO
  const [archivoSearchValue, setArchivoSearchValue] = useState<string | null>(null);

  const handleSearch = (startDate:string, endDate:string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = archivosBDCopia.filter(file => {
      const fileDate = new Date(file.date);
      return fileDate >= start && fileDate <= end;
    });
    setFilteredFiles(filtered);
  };

  const handleOnSearchTutor = (query: string) => {
    setArchivoSearchValue(query);
    const filtered = archivosBDCopia.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredFiles(filtered);
  };  
 
  // Configurar el worker de pdf.js
  const [previewContent, setPreviewContent] = useState<string | Blob | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);
  const viewerRef = useRef<Viewer>();

  const handleFilePreview = (file: ExtendedFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      setPreviewUrl(url);
    };
    reader.readAsDataURL(file);
  };


  return ( 
    <div className="flex flex-col h-full"> 
      <SearchBar handleSearch={handleSearch} handleOnSearchTutor={handleOnSearchTutor} />   
      <div className="flex w-full h-full">
        <div className="w-full p-4 border-r border-gray-300 flex flex-col relative h-full">
          <div className="flex justify-between items-center mb-4">
            <div className='flex w-full h-full items-center border-custom border drop-shadow-md px-4 py-2 mr-2'>
              <span className='block truncate flex flex-row gap-4'>
                <h3 className='font-montserrat text-lg font-bold text-primary'>Alumno:</h3>
                <h3 className='font-montserrat text-lg font-semibold text-primary truncate'>
                  {userName}
                </h3>
              </span>
            </div>
            <div>
              {isTutor != 1 && (
                <div>
                  {!enableAttendance ? (
                    <Button variant="primario" onClick={() => setEnableAttendance(true)} text="Editar" />
                  ) : (
                    <div className="flex">
                      <Button variant="secundario" onClick={handleCancelar} text="Cancelar" className="mr-2" />
                      <Button variant="primario" onClick={handleGuardar} text="Guardar" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-y-auto flex-1 bg-gray-200 rounded-lg p-4 mb-4">
            <ul>
              {loading ? ( // Mostrar spinner si isLoading es true
                <div className='w-full h-full flex justify-center items-center'>
                  <ClipLoader color="#3498db" loading={loading} size={60} />
                </div>
              ) : (
                filteredFiles.filter(file => file.eliminado !== 1).map((file, index) => (
                  <li key={index} className="flex items-center justify-between mb-2 bg-gray-100 rounded-lg p-3">
                    <span className="flex items-center flex-1 cursor-pointer" onClick={() => handleFilePreview(file)}>
                      <span>{file.name}</span>
                      {file.date && <span className="text-gray-500 text-xs ml-auto">{file.date}</span>}
                    </span>
                    <div className="flex items-center ml-4">
                      <button onClick={() => handleFileDownload(file)} className="mr-2">
                        <FaDownload />
                      </button>
                      {enableAttendance && (
                        <div className="flex">
                          <button onClick={() => handleFileDelete(file)}> <FaTrashAlt /> </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {enableAttendance && (
            <Button onClick={triggerFileInput} text="Subir Archivo" className="ml-auto p-4" />
          )}
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/*<div className="w-1/2 p-4 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-4">Vista Previa</h2>
          <div className="border p-4 flex-1 overflow-auto flex flex-col justify-center">
            {previewUrl && (
              <div style={{ height: '500px', marginBottom: '20px' }}>
                <Viewer fileUrl={previewUrl} />
              </div>
            )}
          </div>
        </div>*/}
      </div>

      <div>{isModalOpen && <ModalResultadoCita onClose={closeModal} loading={loadingServidor} />}</div>
    </div>

  );
};

export default PageArchivosAlumnos;
