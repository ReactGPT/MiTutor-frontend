import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, ChangeEvent,  useEffect } from 'react';
import InputTutor from './InputTutor';
import Button from '../Button';
import axios from 'axios';  
import { IconDelete,SaveIcon } from '../../assets';
import { ExtendedFile } from '../../store/types/Archivo';
import { FaDownload } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { date } from 'react-form-ease';

interface ModalComentarioProps {
  isOpen: boolean;
  onClose: () => void;
  updatePage: () => void; // Nueva prop para la función de actualización
  commentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  commentValue: string;
  selectedFiles: ExtendedFile[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<ExtendedFile[]>>;
  loading: boolean;
}

export default function ModalComentario({ isOpen, onClose,  updatePage, commentValue,commentChange,
  selectedFiles, setSelectedFiles,loading}: ModalComentarioProps) {

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => {
        // Clonamos los archivos y agregamos la propiedad 'nuevo'
        const extendedFile: ExtendedFile = Object.assign(file, {
          nuevo: 1, eliminado:0, id_archivo: 0,
          nombre:file.name, date: new Date().toISOString()
        });
        return extendedFile;
      });
  
      setSelectedFiles(prevFiles => {
        const updatedFiles = prevFiles.map(existingFile => {
          const match = newFiles.find(newFile =>
            existingFile.name === newFile.name && existingFile.size === newFile.size
          );
  
          if (match) {
            existingFile.eliminado=0; 
          }
  
          return existingFile;
        });
  
        // Filtramos los archivos que no están en prevFiles
        const uniqueNewFiles = newFiles.filter(newFile =>
          !prevFiles.some(existingFile =>
            existingFile.name === newFile.name && existingFile.size === newFile.size
          )
        );
  
        console.log('Files added or updated:', [...updatedFiles, ...uniqueNewFiles]);
        return [...updatedFiles, ...uniqueNewFiles];
      });
    }
  };

  const handleFileDelete = (fileToDelete: ExtendedFile) => {
    setSelectedFiles(prevFiles => 
      prevFiles.map(file => {
        if (file.name === fileToDelete.name) {
          // Actualizamos el atributo 'nuevo' a 2
          console.log(file);
          fileToDelete.eliminado=1;
          return fileToDelete; 
        }
        return file;
      })
    );
  };
  
    
  const triggerFileInput = () => {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    input.value = ''; // Limpiar el valor del input
    input.click();
  };

  const handleFileDownload = (file: ExtendedFile) => {
    try {
      const url = URL.createObjectURL(file); // Crear URL del archivo
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click(); // Iniciar descarga
      document.body.removeChild(link); // Limpiar después de la descarga
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };  
  function closeModal() {
    onClose(); // Llamar a la función onClose para comunicar que se cerró el modal
  }
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  <div className=''>

                    <div className="absolute right-7 top-7">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          style={{ width: '40px', height: '49px', cursor: 'pointer' }}
                          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 hover:stroke-red-500
                                                  bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md"
                          onClick={closeModal}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div> 
  
                  <div className='flex items-center justify-center px-7 py-7 relative'> 
                    <p className="font-montserrat text-[28px] font-bold text-primary">
                      Comentario y Archivos
                    </p>
                  </div>
                </div>
              </Dialog.Title>
              
              
              <div>
                {/*<p className="font-montserrat text-[35px] font-bold text-primary">Comentario y Archivos</p>*/}
                <div className='´w-4'>
                  <textarea
                    name='studentAnnotations'
                    value={commentValue}
                    placeholder='Comentario visible para el alumno'
                    onChange={commentChange}
                    className='w-full h-full rounded-md resize-none 
                      outline-none px-3 py-2 mt-1 font-montserrat text-[90%] 
                      border-custom drop-shadow-md font-bold'
                    style={{ width: '400px', height: '100px' }}
                  />  
                </div>
                  
                <div className='w-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md'>
                  <h3 className='font-montserrat text-lg mr-2 font-bold'>Archivos seleccionados:</h3>
                  {loading ? ( // Mostrar spinner si isLoading es true
                    <div className='w-full flex justify-center items-center'>
                      <ClipLoader color="#3498db" loading={loading} size={60} />
                    </div>
                  ) : (
                    selectedFiles.length > 0 && (
                      <div className='w-full max-h-48 overflow-y-auto'>
                        <ul>
                          {selectedFiles
                            .filter(file => file.eliminado !== 1)
                            .map((file, index) => (
                              <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-md mb-2" style={{ maxHeight: '300px' }}>
                                <span className="flex-1">{file.name}</span>
                                <Button icon={IconDelete} iconSize={4} onClick={() => handleFileDelete(file)} />
                                <Button icon={FaDownload} iconSize={15} onClick={() => handleFileDownload(file)} />
                              </li>
                            ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>

 
                <div className="flex justify-end pt-3">
                  <Button onClick={triggerFileInput} text='Seleccionar Archivo'/> 
                  <input
                    type='file'
                    id='fileInput'
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileChange}
                    />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}