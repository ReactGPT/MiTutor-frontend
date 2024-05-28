import React from 'react';
import Button from '../../../components/Button';
import { SearchInput } from "../../../components";
import { useState } from "react";
import CardPlanAccion from '../../../components/Tutor/CardPlanAccion';
import { ActionPlan } from '../../../store/types/ActionPlan';
import Pagination from "../../../components/Pagination";
import ModalNuevoPlanAccion from '../../../components/Tutor/ModalNuevoPlanAccion';
import ModalRegistroExitoso from '../../../components/Tutor/ModalRegistroExitoso';
import { useEffect } from 'react';
import axios from 'axios';
//import { useTitle } from '../../../context/TitleContext';
import { FaCheckCircle } from "react-icons/fa";
import {Services as ServicesProperties} from '../../../config';
import { useLocation } from 'react-router-dom';


const PageListadoPlanAccionAlumno = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);

  const { state } = useLocation() || {};
  const { studentId: studentId = 2, programId: programId = 4, tutorId: tutorId = 1 } = state || {};


  /*const {state} = useLocation() || {};
  const {student_Id} = state?.studentId || 2;
  const {program_Id} = state?.programId || 4;
  const {tutor_Id} = state?.tutorId || 1;

  console.log('state:', state?.studentId || 2); //imprime state: 2
  console.log('student_id:', student_Id); // imprime student_id: undefined
  //const { setTitle } = useTitle(); */


  useEffect(() => {
    //setTitle("Listado Planes de Acción del Alumno");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(ServicesProperties.BaseUrl+'/listarActionPlans?studentId='+studentId+'&programId='+programId+'&TutorId='+tutorId);
      
      setActionPlans(response.data.data);
      //console.log('planes:', response.data.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updatePlans = async () => {
    await fetchData();
    setRegistrationModalOpen(true); // Abre el modal de registro exitoso después de actualizar los planes
  };


  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const filteredPlans = Array.isArray(actionPlans) ? actionPlans.filter((plan: ActionPlan) =>
    plan.name.toLowerCase().includes(searchText.toLowerCase())
  ) : [];


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);

  return (
    <div className="w-full h-full flex flex-col gap-5">

      <div className="w-full h-[85%] flex flex-col gap-5">
      {currentPlans.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <img src="src\assets\Tutor\no-planes.png" alt="No plans" className="w-1/4 h-auto mb-4" />
          <i className="your-icon-class-name mb-2"></i> {/* Cambia `your-icon-class-name` por la clase de tu ícono */}
          <p className="text-xl font-bold">Ups... Todavía no tienes asignado ningún plan de acción.</p>
          <p className="text-md">Por favor, espera a que tu tutor te asigne uno. Si tienes alguna duda, no dudes en contactarlo.</p>
        </div>
      ) : (
        currentPlans.map((plan) => (
          <CardPlanAccion key={plan.actionPlanId} data={plan} usuario='alumno'/>
        ))
      )}
      </div>
      {currentPlans.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredPlans.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )
      }
    </div>
  );
}

export default PageListadoPlanAccionAlumno;