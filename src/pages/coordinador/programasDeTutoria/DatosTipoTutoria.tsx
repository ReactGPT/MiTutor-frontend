import React, { useEffect, useState } from 'react';
import { Checkbox, Radial, Toogle, InputCell } from '../../../components';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { AddCircleIcon } from '../../../assets';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { tutoringProgramSlice } from '../../../store/slices';

type InputProps = {
  className: string;
};

function DatosTipoTutoria({ className }: InputProps) {
  const { tutoringProgram, onChangeTutoringProgram, onChangeTutoringProgramObject } = useTutoringProgramContext();
  //const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);
  const [disabledCantIntegrantes, setDisabledCantIntegrante] = useState<boolean>(!tutoringProgram.grupal);
  //const {handleChangeTutoringProgram,setTutoringProgram}=tutoringProgramSlice.actions;
  //const dispatch=useAppDispatch();
  // const handleLocalChangeTutoringProgram= (name:string,value:any)=>{
  //   dispatch(handleChangeTutoringProgram({name:name,value:value}));
  // };
  const handleOnChangeCantMembers = (name: 'Aumentar' | 'Disminuir') => {
    if (name === "Aumentar") {
      onChangeTutoringProgram('cant_integrantes', (tutoringProgram.cant_integrantes + 1));
    }
    if (name === 'Disminuir') {
      onChangeTutoringProgram('cant_integrantes', (tutoringProgram.cant_integrantes - 1 < 0 ? 0 : (tutoringProgram.cant_integrantes - 1)));
    }
  };
  return (
    <div className={className}>

      <h2 className='text-xl font-bold font-roboto text-black'>Tipo de Tutoría</h2>

      <div className='flex flex-col w-full h-full justify-between'>

        {/* Presencial o virtual */}
        <div className='flex flex-row w-full h-fit gap-4 max-h-[90px] p-2'>
          {/* <Radial boxSize='w-[50%] gap-4' left  checked={tutoringProgram.presencial} onChange={()=>{onChangeTutoringProgram("presencial",!tutoringProgram.presencial)}} label='Presencial'/> */}
          <Checkbox boxSize='w-[50%] gap-4' left value={tutoringProgram.presencial} onChange={() => { onChangeTutoringProgram("presencial", !tutoringProgram.presencial); }} label='Presencial' />
          <Checkbox boxSize='w-[50%] gap-4' left value={tutoringProgram.virtual} onChange={() => { onChangeTutoringProgram("virtual", !tutoringProgram.virtual); }} label='Virtual' />
          {/* <Radial boxSize='w-[50%] gap-4' left  checked={tutoringProgram.virtual} onChange={()=>{onChangeTutoringProgram("virtual",!tutoringProgram.virtual)}} label='Virtual'/>   */}
        </div>

        {/* Opcional o obligatorio */}
        <div className='flex flex-row w-full h-fit gap-4 max-h-[90px] p-2'>
          <Radial boxSize='w-[50%] gap-4' left key='Opcional' checked={tutoringProgram.obligatorio ? false : true} onChange={() => { onChangeTutoringProgram("obligatorio", !tutoringProgram.obligatorio); }} label='Opcional' />
          <Radial boxSize='w-[50%] gap-4' left key='Obligatorio' checked={tutoringProgram.obligatorio ? true : false} onChange={() => { onChangeTutoringProgram("obligatorio", !tutoringProgram.obligatorio); }} label='Obligatorio' />
        </div>

        {/* Grupal o individual */}
        <div className='flex flex-row w-full h-fit gap-4  max-h-[90px] items-center p-2'>

          <Toogle
            value={tutoringProgram.grupal}
            boxSize='w-[50%]'
            text='Grupal'
            onChange={() => {
              setDisabledCantIntegrante(!tutoringProgram.grupal ? false : true);

              onChangeTutoringProgramObject({
                ...tutoringProgram,
                "cant_integrantes": !!tutoringProgram.grupal ? 1 : tutoringProgram.cant_integrantes,
                "grupal": !tutoringProgram.grupal
              });
              // if(!!tutoringProgram.grupal){
              //   console.log("in");
              //   onChangeTutoringProgram('cant_integrantes',1);
              // }
              // onChangeTutoringProgram("grupal",!tutoringProgram.grupal);             
            }}
          />

          <div className='flex flex-col w-[50%]'>
            <label className='me-2 text-sm font-medium text-primary dark:text-gray-300'>Max. Integrantes</label>
            <div className='flex flex-row gap-1'>
              <button onClick={() => handleOnChangeCantMembers('Disminuir')}>
                <AddCircleIcon size={6} />
              </button>
              <InputCell disabled={disabledCantIntegrantes} name='cant_integrantes' type='number' boxSize='w-12' onChange={{ tipo: 'object', onChange: onChangeTutoringProgram }} text={tutoringProgram.cant_integrantes}></InputCell>
              <button onClick={() => handleOnChangeCantMembers('Aumentar')}>
                <AddCircleIcon size={6} />
              </button>
            </div>
          </div>

        </div>

        {/* Activacion */}
        <div className='flex flex-row w-full h-fit gap-4 max-h-[90px] p-2'>
          <Toogle boxSize='w-[50%]' onChange={() => { onChangeTutoringProgram("vigente", !tutoringProgram.vigente); }} value={tutoringProgram.vigente} text='Activa' />
        </div>

      </div>

    </div>
  );
}

export default DatosTipoTutoria;