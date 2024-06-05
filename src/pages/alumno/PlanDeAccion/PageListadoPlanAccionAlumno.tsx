import { useState } from "react";
import CardPlanAccion from '../../../components/Tutor/CardPlanAccion';
import { ActionPlan } from '../../../store/types/ActionPlan';
import Pagination from "../../../components/Pagination";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useActionPlansStudent } from '../../../store/hooks/useActionPlan';
import { useAuth } from "../../../context";
import noPlansImg from "../../../assets/Tutor/no-planes.png";

const PageListadoPlanAccionAlumno = () => {
  const { userData } = useAuth();
  const studentId = userData?.userInfo?.id || 0;

  const { state } = useLocation() || {};
  //const { studentId: studentId = 2, programId: programId = 4, tutorId: tutorId = 1 } = state || {};
  const { programId: programId, tutorId: tutorId } = state || {};
  console.log(state);
  //Estados para el uso de la API
  const { actionPlans, fetchActionPlans } = useActionPlansStudent(studentId, programId, tutorId); //el id del alumno logueado

  useEffect(() => {
    fetchActionPlans();
  }, []);

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
            <img src={noPlansImg} alt="No plans" className="w-1/4 h-auto mb-4" />
            <i className="your-icon-class-name mb-2"></i> {/* Cambia `your-icon-class-name` por la clase de tu ícono */}
            <p className="text-xl font-bold">Ups... Todavía no tienes asignado ningún plan de acción.</p>
            <p className="text-md">Por favor, espera a que tu tutor te asigne uno. Si tienes alguna duda, no dudes en contactarlo.</p>
          </div>
        ) : (
          currentPlans.map((plan) => (
            <CardPlanAccion key={plan.actionPlanId} data={plan} usuario='alumno' />
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
};

export default PageListadoPlanAccionAlumno;