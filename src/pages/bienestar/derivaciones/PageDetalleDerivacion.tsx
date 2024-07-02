import React, { useState } from 'react';
import { Button, Combobox } from '../../../components';
import { DerivationBienestar } from '../../../store/types/Derivation';
import { useAuth } from '../../../context';
import { TutorRoleDetails } from '../../../store/types';
import InputTutor from '../../../components/Tutor/InputTutor';
import TextAreaTutor from '../../../components/Tutor/TextAreaTutor';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditIcon, SaveIcon } from '../../../assets';
import ModalConfirmation from '../../../components/ModalConfirmation';
import { useDerivationBienestar } from '../../../store/hooks/useDerivationBienestar';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';

function PageDetalleDerivacion() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { derivationData } = state;

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [editedData, setEditedData] = useState({
    observaciones: derivationData.observaciones,
    status: derivationData.status
  });

  const { updateDerivacion, loading, error } = useDerivationBienestar(userData?.userInfo?.id || 0);

  const statusOptions = [
    { id: 1, name: 'Pendiente' },
    { id: 2, name: 'Observado' },
    { id: 3, name: 'Atendido' },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    const updatedDerivation: DerivationBienestar = {
      ...derivationData,
      observaciones: editedData.observaciones,
      status: editedData.status
    };

    try {
      await updateDerivacion(updatedDerivation);
      setIsEditing(false);
      setIsModalOpen(false);
      setIsOpenModalSuccess(true);
    } catch (error) {
      console.error('Error al actualizar la derivación:', error);
      setIsOpenModalError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (selectedOption: { id: number; name: string }) => {
    setEditedData(prev => ({ ...prev, status: selectedOption.name }));
  };

  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-auto'>
        <div className='flex flex-col gap-2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
          <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
            <h2 className='text-xl font-bold text-primary'>Datos del Alumno</h2>
          </div>
          <div className='flex flex-row w-full h-full gap-2 h-[70%]'>
            <div className='flex flex-col w-[100%]'>
              <div className='flex flex-col gap-2'>
                <InputTutor titulo="Código del alumno" name="persona.name" value={derivationData.codigoAlumno} texto='Ingresa los nombres' enable={false} readOnly={true} />
                <InputTutor titulo="Nombres del alumno" name="persona.name" value={derivationData.nombreAlumno} texto='Ingresa los nombres' enable={false} readOnly={true} />
                <InputTutor titulo="Correo del alumno" name="persona.name" value={derivationData.correoAlumno} texto='Ingresa los nombres' enable={false} readOnly={true} />
                <InputTutor titulo="Programa de Tutoría" name="persona.name" value={derivationData.programName} texto='Ingresa los nombres' enable={false} readOnly={true} />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 border-custom drop-shadow-md px-4 py-2'>
          <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
            <h2 className='text-xl font-bold text-primary'>Seguimiento Derivación</h2>
            <div className='flex flex-row gap-4'>
              {!isEditing && (
                <Button text='Editar' variant='primario' icon={EditIcon} onClick={handleEdit} />
              )}
              {isEditing && (
                <Button text='Guardar' variant='call-to-action' icon={SaveIcon} iconSize={6} onClick={handleSave} />
              )}
            </div>
          </div>
          <div className='flex flex-row w-full h-full gap-2 h-[70%]'>
            <div className='flex flex-col w-full'>
              <div className='flex flex-col gap-2'>
                <div className="drop-shadow-md p-3 flex flex-col">
                  <label htmlFor="">Observaciones</label>
                  <textarea
                    name="observaciones"
                    value={editedData.observaciones}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 mt-1 font-montserrat text-[90%] bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-bold"
                    style={{ height: "100%", overflow: "auto", resize: "none", marginLeft: "0" }}
                  />
                </div>
                <div className="drop-shadow-md flex space-x-5 height-100%" style={{ display: "flex", height: "100%", flexDirection: "column" }}>
                  <div className='flex flex-col p-3'>
                    <label className="font-roboto text-base text-primary">Estado de la Solicitud de Derivación</label>
                    <Combobox
                      name="status"
                      buttonStyle='w-full h-full px-3 py-2 mt-1 font-roboto text-base bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-normal'
                      noMt={true}
                      options={statusOptions}
                      value={statusOptions.find((item) => item.name === editedData.status)}
                      onChange={handleStatusChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 border-custom drop-shadow-md px-4 py-2'>
          <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
            <h2 className='text-xl font-bold text-primary'>Datos del Tutor</h2>
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex flex-col gap-2'>
              <InputTutor titulo="Código" name="derivationData.codigoTutor" value={derivationData.codigoTutor} texto='Ingresa los nombres' enable={false} readOnly={true} />
              <InputTutor titulo="Nombres" name="derivationData.nombreTutor" value={derivationData.nombreTutor} texto='Ingresa los nombres' enable={false} readOnly={true} />
              <InputTutor titulo="Correo" name="derivationData.correoTutor" value={derivationData.correoTutor} texto='Ingresa los nombres' enable={false} readOnly={true} />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
          <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
            <h2 className='text-xl font-bold text-primary'>Detalles de la Derivación</h2>
          </div>
          <div className='flex flex-row w-full h-full gap-2 h-[70%]'>
            <div className='flex flex-col w-[100%]'>
              <div className='flex flex-col gap-2'>
                <InputTutor titulo="Fecha de Creación" name="derivationData.creationDate" value={derivationData.creationDate} enable={false} readOnly={true} />
                <InputTutor titulo="Unidad de Derivación" name="derivationData.unitDerivationName" value={derivationData.unitDerivationName} texto='Ingresa los nombres' enable={false} readOnly={true} />
                <TextAreaTutor titulo="Motivo de la Derivación" name="derivationData.reason" value={derivationData.reason} texto='No se registraron motivos' enable={false} readOnly={true} />
                <TextAreaTutor titulo="Comentarios Adicionales" name="derivationData.comment" value={derivationData.comment} texto='No se registraron comentarios adicionales' enable={false} readOnly={true} />
              </div>
            </div>
          </div>
        </div>

      </div>
      <ModalConfirmation
        isOpen={isModalOpen}
        message={`¿Está seguro de guardar los cambios en la derivación del alumno ${derivationData.codigoAlumno}?`}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
        isAcceptAction={true}
      />
      <ModalSuccess isOpen={isOpenModalSuccess} message={`Se actualizó con éxito la derivación del alumno ${derivationData.codigoAlumno}`}
        onClose={() => {
          setIsOpenModalSuccess(false);
        }}
      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
        onClose={() => {
          setIsOpenModalError(false);
        }}
      />
    </div>
  );
};

export default PageDetalleDerivacion;
