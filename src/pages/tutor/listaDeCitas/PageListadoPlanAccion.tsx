import Button from '../../../components/Button';
import { useState } from "react";
import CardPlanAccion from '../../../components/Tutor/CardPlanAccion';
import { ActionPlan } from '../../../store/types/ActionPlan';
import Pagination from "../../../components/Pagination";
import ModalNuevoPlanAccion from '../../../components/Tutor/ModalNuevoPlanAccion';
import ModalRegistroExitoso from '../../../components/Tutor/ModalRegistroExitoso';
import { useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useActionPlans } from '../../../store/hooks/useActionPlan';
import { useAuth } from '../../../context';
import { TutorRoleDetails } from '../../../store/types';
import noPlansImg from "../../../assets/Tutor/no-planes.webp";


const PageListadoPlanAccion = () => {
  const { userData } = useAuth();
  const tutorId = (userData?.userInfo?.roles[0].details as TutorRoleDetails).tutorId;

  const [modalOpen, setModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const { state } = useLocation();
  const { studentId } = state;
  const { programId } = state;

  // Estados para la búsqueda y paginación
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //Estados para el uso de la API
  const { actionPlans, fetchActionPlans } = useActionPlans(studentId, programId, tutorId);

  useEffect(() => {
    fetchActionPlans();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updatePlans = async () => {
    fetchActionPlans();
    setRegistrationModalOpen(true); // Abre el modal de registro exitoso después de actualizar los planes
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
      <div className='flex justify-end'>
        <Button variant='call-to-action' onClick={openModal} text='Nuevo Plan de Acción' />
        <ModalNuevoPlanAccion isOpen={modalOpen} onClose={closeModal} updatePage={updatePlans} studentId={studentId} programId={programId} />
        {registrationModalOpen && ( // Mostrar el modal de registro exitoso si registrationModalOpen es true
          <ModalRegistroExitoso
            title="¡Registro Exitoso!"
            description="El plan de acción se registró con éxito. Ahora puedes agregar compromisos para el estudiante."
            icon={FaCheckCircle}
            iconSize={60}
            onClose={() => setRegistrationModalOpen(false)} />
        )}
      </div>

      <div className="w-full h-[85%] flex flex-col gap-5">
        {currentPlans.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <img src={noPlansImg} alt="No plans" className="w-1/4 h-auto mb-4" />
            <i className="your-icon-class-name mb-2"></i> {/* Cambia `your-icon-class-name` por la clase de tu ícono */}
            <p className="text-xl font-bold">Ups... Todavía no tienes ningún plan de acción para el alumno</p>
            <p className="text-md">Crea un nuevo plan de acción para hacer seguimiento de los compromisos acordados.</p>
          </div>
        ) : (
          currentPlans.map((plan) => (
            <CardPlanAccion key={plan.actionPlanId} data={plan} usuario='tutor' />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredPlans.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PageListadoPlanAccion;