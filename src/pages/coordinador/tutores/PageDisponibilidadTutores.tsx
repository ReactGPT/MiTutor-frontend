import React, { useEffect } from 'react';
import { useProgramaTutoria } from '../../../store/hooks';
import TablaTutores from './TablaTutores';
import { Tutor } from '../../../store/types';

const PageDisponibilidadTutores: React.FC = () => {
  const { isLoading, fetchTutoresByProgramaTutoria: fetchTutores, tutorListByProgramId: tutorList } = useProgramaTutoria();

  useEffect(() => {
    fetchTutores(-1);
  }, []);

  return (
    <div className='w-full h-full'>
      <TablaTutores className="w-full h-full" tutores={tutorList} loadingTutores={isLoading} setTutorSelectedForDelete={(tutor: Tutor) => { }} />
    </div>
  );
};

export default PageDisponibilidadTutores;