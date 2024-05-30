import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, ChangeEvent,  useEffect } from 'react';
import InputTutor from './InputTutor';
import Button from '../Button';
import axios from 'axios';  
import { IconDelete,SaveIcon } from '../../assets';
import { ExtendedFile } from '../../store/types/Archivo';

interface ModalComentarioProps {
  isOpen: boolean;
  onClose: () => void;
  updatePage: () => void; // Nueva prop para la función de actualización
  commentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  commentValue: string;
  selectedFiles: ExtendedFile[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<ExtendedFile[]>>;
}

export default function ModalComentario({ isOpen, onClose,  updatePage, commentValue,commentChange,
  selectedFiles, setSelectedFiles}: ModalComentarioProps) {
  
  /*const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //ver que no haya sido eliminado, si es eliminado solo actualizas el nuevo a 1
    if (e.target.files) {
      const files = Array.from(e.target.files).map(file => {
        // Clonamos los archivos y agregamos la propiedad 'nuevo'
        const extendedFile: ExtendedFile = Object.assign(file, {
          nuevo: 1
        });
        return extendedFile;
      });
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
      console.log('Files added:', files);
    }
  };*/

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => {
        // Clonamos los archivos y agregamos la propiedad 'nuevo'
        const extendedFile: ExtendedFile = Object.assign(file, {
          nuevo: 1, eliminado:0, id_archivo: 0,
          nombre:file.name
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
    document.getElementById('fileInput')?.click();
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

  useEffect(() => {
    console.log('selectedFiles updated:', selectedFiles);
  }, [selectedFiles]);

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
            <div className="border-custom shadow-custom bg-[rgba(235,_236,_250,_1.00)] relative bg-white rounded-lg p-4 max-w-auto mx-auto">
              <div className="p-4">
                <p className="font-montserrat text-[35px] font-bold text-primary">Comentario y Archivos</p>
                <div className='´w-4'>
                  <textarea
                    name='studentAnnotations'
                    value={commentValue}
                    placeholder='Comentario visible para el alumno'
                    onChange={commentChange}
                    className='w-full h-full rounded-md resize-none 
                      outline-none px-3 py-2 mt-1 font-montserrat text-[90%] 
                      border-custom drop-shadow-md font-bold'
                  />  
                </div>
                 
                <div className="flex justify-end">
                  <Button onClick={triggerFileInput} text='Subir Archivos'/> 
                  <input
                    type='file'
                    id='fileInput'
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileChange}
                    />
                </div>
                
                <div className='w-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md'>
                <h3 className='font-montserrat text-lg mr-2 font-bold'>Archivos seleccionados:</h3>
                  {selectedFiles.length > 0 && (
                    <div className='w-full max-h-48 overflow-y-auto'>
                      <ul>
                        {selectedFiles
                          .filter(file => file.eliminado != 1)
                          .map((file, index) => (
                          <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-md mb-2" style={{ maxHeight: '300px' }}> 
                            <span className="flex-1">{file.name}</span>  
                            <Button icon={IconDelete} iconSize={4} onClick={()=> handleFileDelete(file)}/> 
                            <Button icon={SaveIcon} iconSize={4} onClick={() => handleFileDownload(file)}/> 
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
