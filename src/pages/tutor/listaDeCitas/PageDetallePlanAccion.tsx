import React from 'react';
import Button from '../../../components/Button';
import InputTutor from '../../../components/Tutor/InputTutor';
import TextAreaTutor from '../../../components/Tutor/TextAreaTutor';
import IconDetails from '../../../assets/svg/IconDetails';
import TablaDetallePlanAccion from '../../../components/Tutor/TablaDetallePlanAccion';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { ActionPlan } from '../../../store/types/ActionPlan';
import ModalNuevoCompromiso from '../../../components/Tutor/ModalNuevoCompromiso';
import ModalRegistroExitoso from '../../../components/Tutor/ModalRegistroExitoso';
import axios from 'axios';
import { useEffect } from 'react';
import { FaRegEye, FaSave, FaTimes } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegEyeSlash } from "react-icons/fa";
import { useTitle } from '../../../context/TitleContext';
import { FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { TrashIcon } from '../../../assets';
import ModalAdvertencia from '../../../components/Tutor/ModalAdvertencia';

const PageDetallePlanAccion = () => {
  const { id } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [editionModalOpen, seteditionModalOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { setTitle } = useTitle();
  const [deleteCommintModalOpen, setdeleteCommintModalOpen] = useState(false);
  const [editCommintModalOpen, seteditCommintModalOpen] = useState(false);
  const [deleteActionPlanModalOpen, setdeleteActionPlanModalOpen] = useState(false);
  const [tablaEditable, setTablaEditable] = useState(false);

  useEffect(() => {
    setTitle("Detalle Plan de Acción");
    fetchData();
  }, []);

  // Trae los datos del plan de acción
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44369/listarActionPlansPorId?ActionPlanId=' + id);
      const data = response.data.data;
      if (data.length > 0) {
        const plan = data[0];
        setName(plan.name);
        setDescription(plan.description);
        setActionPlans(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(id);

  const handleEditPlan = () => {
    setEditable(true);
  };

  const handleCancelEdit = () => {
    setEditable(false);
    fetchData();
  };

  const handleConfirmDeleteCommit = () => {
    setdeleteCommintModalOpen(true);
  }

  const handleConfirmDeleteActionPlan = () => {
    setdeleteActionPlanModalOpen(true);
  }

  const handleSaveChanges = async () => {
    try {
      const newData = {
        "actionPlanId": id,
        "name": name,
        "description": description,
        "isActive": plan?.isActive,
        "studentProgramId": 0,
        "tutorId": 0,
        "creationDate": "2024-05-09T07:35:12.513Z",
        "modificationDate": "2024-05-09T07:35:12.513Z"
      };
      console.log(newData);
      await axios.put(`https://localhost:44369/actualizarActionPlan`, newData);
      seteditionModalOpen(true);
      setEditable(false);
    } catch (error) {
      console.error('Error updating action plan:', error);
    }
  };

  const handleDeleteActionPlan = async () => {
    await axios.put('https://localhost:44369/eliminarActionPlan?actionPlanId=' + id);
    setdeleteActionPlanModalOpen(false);
    window.location.pathname = 'listadoPlanAccion';
  }

  const handleDisabledActionPlan = async () => {
    try {
      const data3 = {
        "actionPlanId": id,
        "name": plan?.name,
        "description": plan?.description,
        "isActive": false,
        "studentProgramId": 0,
        "tutorId": 0,
        "creationDate": "2024-05-10T04:39:19.094Z", //no necesita
        "modificationDate": "2024-05-10T04:39:19.094Z" //no necesita
      }
      await axios.put('https://localhost:44369/actualizarActionPlan', data3);
      setdeleteActionPlanModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating action plan:', error);
    }
  }

  const handleEnabledActionPlan = async () => {
    try {
      const data3 = {
        "actionPlanId": id,
        "name": plan?.name,
        "description": plan?.description,
        "isActive": true,
        "studentProgramId": 0,
        "tutorId": 0,
        "creationDate": "2024-05-10T04:39:19.094Z", //no necesita
        "modificationDate": "2024-05-10T04:39:19.094Z" //no necesita
      }
      await axios.put('https://localhost:44369/actualizarActionPlan', data3);
      setdeleteActionPlanModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating action plan:', error);
    }
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // actualiza la página después de registrar un compromiso
  const updateCommitments = async () => {
    setRegistrationModalOpen(true); // Abre el modal de registro exitoso después de 
  };

  let plan: ActionPlan | undefined;
  if (id !== undefined) {
    plan = actionPlans.find(objeto => objeto.actionPlanId == parseInt(id));
    if (plan !== undefined) {
      console.log(plan.description);
    }
  }

  return (
    <div className='w-full h-full'>
      <div className="w-full flex bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5" style={{ display: "flex", width: "100%", flexDirection: "row", marginBottom: "1.5rem" }}>
        <div className='flex' style={{ flexDirection: "column", width: "40%", marginRight: "2rem" }}>
          <InputTutor titulo='Nombre' value={name} readOnly={!editable} onChange={(e) => setName(e.target.value)} />
          <div className='grid grid-cols-2 gap-4' style={{ width: "100%" }}>
            <InputTutor titulo='Fecha de creación' texto={plan?.creationDate ? new Date(plan.creationDate).toLocaleDateString() : 'No disponible'} enable={false} />
            <InputTutor titulo='Fecha de Última Modificación' texto={plan?.modificationDate ? new Date(plan.modificationDate).toLocaleDateString() : 'No disponible'} enable={false} />
          </div>
        </div>
        <div className='flex' style={{ flexDirection: "column", width: "40%" }}>
          <TextAreaTutor titulo='Descripción' value={description} readOnly={!editable} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className='flex flex-col items-center' style={{ justifyContent: "space-evenly", width: "20%" }}>
          {plan && plan.isActive === true ? (
            editable ? (
              <>
                <Button text="Guardar Cambios&nbsp;" variant='call-to-action' icon={FaSave} iconSize={20} onClick={handleSaveChanges} />
                <Button text="Cancelar Cambios" variant='secundario' icon={FaTimes} iconSize={20} onClick={handleCancelEdit} />
              </>
            ) : (
              <>
                <Button text="Editar Plan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" variant='primario' icon={HiOutlinePencil} iconSize={20} onClick={handleEditPlan} />
                <Button text="Desactivar Plan" variant='warning' icon={FaRegEyeSlash} iconSize={20} onClick={handleDisabledActionPlan} />
                <Button text="Eliminar Plan&nbsp;&nbsp;&nbsp;&nbsp;" variant='warning' icon={FaRegTrashAlt} iconSize={20} onClick={handleConfirmDeleteActionPlan} />
              </>
            )
          ) : (
            <Button text="Activar Plan" variant='warning' icon={FaRegEye} iconSize={20} onClick={handleEnabledActionPlan} />
          )}
        </div>
      </div>
      <div className="w-full flex bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5" style={{ display: "flex", width: "100%", flexDirection: "column" }}>

        <div className='flex' style={{ flexDirection: "column", width: "100%" }}>
          <div className='flex items-center justify-between'>
            <h1 className="font-montserrat text-[35px] font-bold text-primary">Compromisos</h1>
            <Button text="Nuevo Compromiso" variant='call-to-action' onClick={openModal} />
            <ModalNuevoCompromiso
              isOpen={modalOpen}
              onClose={closeModal}
              updatePage={updateCommitments}
              actionPlanId={id ? parseInt(id) : 0}
            />
            {registrationModalOpen && ( // Mostrar el modal de registro exitoso si registrationModalOpen es true
              <ModalRegistroExitoso
                title="¡Registro Exitoso!"
                description="El compromiso se registró con éxito."
                icon={FaCheckCircle}
                iconSize={60}
                onClose={() => window.location.reload()} />
            )}
            {editionModalOpen && ( // Mostrar el modal de edición exitoso si editionModalOpen es true
              <ModalRegistroExitoso //el mismo componente modal, solo le cambio los datos que dalen
                title="¡Cambios Guardados!"
                description="El plan se actualizó con éxito."
                icon={FaCheckCircle}
                iconSize={60}
                onClose={() => seteditionModalOpen(false)} />
            )}
            {deleteActionPlanModalOpen && (
              <ModalAdvertencia
                title="¿Está seguro de eliminar el plan de acción?"
                description="Esta acción no puede revertirse."
                icon={RiErrorWarningLine}
                iconSize={70}
                onClose={() => setdeleteActionPlanModalOpen(false)}
                action={handleDeleteActionPlan}
              />
            )}
          </div>
          <div>
            <TablaDetallePlanAccion onclickDelete={handleConfirmDeleteCommit} onclickEdit={close} actionPlanId={id ? parseInt(id) : 0} />
          </div>
        </div>
      </div>
    </div>

  );
}

export default PageDetallePlanAccion;