import React from 'react';
import Button from '../../../components/Button';
import InputTutor from '../../../components/Tutor/InputTutor';
import TextAreaTutor from '../../../components/Tutor/TextAreaTutor';
import IconDetails from '../../../assets/svg/IconDetails';
import TablaDetallePlanAccion from '../../../components/Tutor/TablaDetallePlanAccion';
import { useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ActionPlan } from '../../../store/types/ActionPlan';
import ModalNuevoCompromiso from '../../../components/Tutor/ModalNuevoCompromiso';
import ModalRegistroExitoso from '../../../components/Tutor/ModalRegistroExitoso';
import axios from 'axios';
import { useEffect } from 'react';
import { FaRegEye, FaSave, FaTimes } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegEyeSlash } from "react-icons/fa";
//import { useTitle } from '../../../context/TitleContext';
import { FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { TrashIcon } from '../../../assets';
import ModalAdvertencia from '../../../components/Tutor/ModalAdvertencia';
import { Services as ServicesProperties } from '../../../config';


const PageDetallePlanAccionAlumno = () => {
  //const { id } = useParams();
  const {state} = useLocation();
  const {id} = state;
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [editionModalOpen, seteditionModalOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  //const { setTitle } = useTitle();
  const [deleteCommintModalOpen, setdeleteCommintModalOpen] = useState(false);
  const [editCommintModalOpen, seteditCommintModalOpen] = useState(false);
  const [deleteActionPlanModalOpen, setdeleteActionPlanModalOpen] = useState(false);
  const [tablaEditable, setTablaEditable] = useState(false);

  useEffect(() => {
    //setTitle("Detalle Plan de Acción");
    fetchData();
  }, []);

  // Trae los datos del plan de acción
  const fetchData = async () => {
    try {
      const response = await axios.get(ServicesProperties.BaseUrl + '/listarActionPlansPorId?ActionPlanId=' + id);
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
      await axios.put(`${ServicesProperties.BaseUrl}/actualizarActionPlan`, newData);
      seteditionModalOpen(true);
      setEditable(false);
    } catch (error) {
      console.error('Error updating action plan:', error);
    }
  };

  const handleDeleteActionPlan = async () => {
    await axios.put(ServicesProperties.BaseUrl + '/eliminarActionPlan?actionPlanId=' + id);
    setdeleteActionPlanModalOpen(false);
    navigate(-1);
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
      await axios.put(ServicesProperties.BaseUrl + '/actualizarActionPlan', data3);
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
      await axios.put(ServicesProperties.BaseUrl + '/actualizarActionPlan', data3);
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
      <div className="w-full flex bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5" style={{ display: "flex", width: "100%", flexDirection: "column", marginBottom: "1.5rem" }}>
        <h1 className="text-3xl font-bold">Datos del Plan de Acción</h1>
        <div style={{display: "flex", width: "100%", flexDirection: "row"}}>
          <div className='flex' style={{ flexDirection: "column", width: "50%", marginRight: "2rem" }}>
            <InputTutor titulo='Nombre' value={name} readOnly={!editable} onChange={(e) => setName(e.target.value)} />
            <div className='grid grid-cols-2 gap-4' style={{ width: "100%" }}>
              <InputTutor titulo='Fecha de creación &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' texto={plan?.creationDate ? new Date(plan.creationDate).toLocaleDateString() : 'No disponible'} enable={false} />
              <InputTutor titulo='Fecha de Última Modificación' texto={plan?.modificationDate ? new Date(plan.modificationDate).toLocaleDateString() : 'No disponible'} enable={false} />
            </div>
          </div>
          <div className='flex' style={{ flexDirection: "column", width: "50%" }}>
            <TextAreaTutor titulo='Descripción' value={description} readOnly={!editable} onChange={(e) => setDescription(e.target.value)} />
          </div>
          
        </div>
      </div>
      <div className="w-full flex bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5" style={{ display: "flex", width: "100%", flexDirection: "column" }}>

        <div className='flex' style={{ flexDirection: "column", width: "100%" }}>
          <div className='flex items-center justify-between'>
            <h1 className="text-3xl font-bold">Compromisos</h1>
          </div>
          <div>
            <TablaDetallePlanAccion onclickDelete={handleConfirmDeleteCommit} onclickEdit={close} actionPlanId={id ? parseInt(id) : 0} usuario='alumno'/>
          </div>
        </div>
      </div>
    </div>

  );
}

export default PageDetallePlanAccionAlumno;