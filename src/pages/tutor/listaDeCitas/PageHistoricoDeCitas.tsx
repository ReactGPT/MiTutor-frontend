import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../../../components/Button';

const Alumno = {
  nombre: 'Alonso',
  apellido: 'Berrospi'
}

const listaCita = [

  {nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '05/11/2024'},
  {nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024'},
  {nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024'},
  {nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Pendiente', fecha: '14/11/2024'},
  {nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '04/11/2024'},
  {nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '16/11/2024'},
  {nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Completado', fecha: '23/11/2024'},
  {nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '12/11/2024'},
  {nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Registrado', fecha: '23/11/2024'},
  {nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024'},
  {nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024'},
  {nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Solicitado', fecha: '05/11/2024'},
  {nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '13/11/2024'},
  {nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Pendiente', fecha: '16/11/2024'}

];

const backgroundClasses = {
  red: 'red-500',
  blue: 'blue-500',
  green: 'green-500',
  yellow: 'yellow-500'
}

let startIndex = 0;

let endIndex = 5;

const PageHistoricoDeCitas = () => {
  
  const numIndices = 5;
  
  const [arrayCitasMostrar,setArrayCitasMostrar] = useState<any[]>([]);

  useEffect(()=>{ setArrayCitasMostrar(listaCita.slice(0,5))},[])

  const handleCambioIndice = (aumentar: boolean) => {
  
    if(aumentar){
      if(endIndex < listaCita.length){
        setArrayCitasMostrar(listaCita.slice(startIndex+numIndices, endIndex+numIndices))
        startIndex = startIndex + numIndices;
        endIndex = endIndex + numIndices;
        console.log(startIndex,endIndex)
      }
    }else{
      if(startIndex > 0){
        setArrayCitasMostrar(listaCita.slice(startIndex-numIndices, endIndex-numIndices))
        startIndex = startIndex - numIndices;
        endIndex = endIndex - numIndices;
        console.log(startIndex,endIndex)
      }
    }
    
  };

  const controlColor = (color: string) => {

    if(color == 'Solicitado')
      return backgroundClasses.yellow;
    else if(color == 'Completado')
      return backgroundClasses.blue;
    else if(color== 'Registrado')
      return backgroundClasses.green;
    else 
      return backgroundClasses.red;

  }

  const imprimirValores = () => {

      console.log(startIndex,endIndex)

  }

  const [query, setQuery] = useState("");


  return (
    <div className="w-full h-full">

      <div className="w-[30%] flex h-[15%] min-h-[60px]">
        <div className="w-full h-[60%] flex flex-row justify-right items-center bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5">
            <span className="font-montserrat text-4xl font-bold text-primary"><pre>Alumno: </pre></span> 
           <span className="font-roboto text-3xl text-primary"> {Alumno.nombre} {Alumno.apellido} </span>
        </div>
      </div>

      <div className="w-full flex h-[12%] min-h-[60px]">
        <div className="w-full h-[50%] flex flex-row justify-right items-center bg-[rgba(235,_236,_250,_1.00)] border-custom drop-shadow-md p-5">
            <input className="w-[77%] bg-[rgba(255,_255,_255,_0.0)] border-transparent focus:outline-none focus:placeholder-none font-roboto text-3xl text-primary" placeholder="Cosa a buscar" type="Text" value={query} onChange={e => setQuery(e.target.value)}></input> 
            <div className="w-[12%] flex">
              <pre className="font-montserrat text-3xl text-primary">Estado  </pre>
              <Button variant="primario" text="" onClick={() => console.log('Botón clickeado')} />
            </div>
            <div className="w-[20%] flex">
              <pre className="font-montserrat text-3xl text-primary">Todas las fechas  </pre>
              <Button variant="primario" text="" onClick={() => console.log('Botón clickeado')} />
            </div>
            <div>
              <Button variant="call-to-action" text="Buscar" onClick={() => imprimirValores()} />
            </div>
        </div>
      </div>

      <div className="w-full h-[65%] min-h-[60px]">

        {arrayCitasMostrar.map((cita) => (

          <div className="w-full h-[20%] min-h-[60px]">
            <div className="w-full h-[85%] flex flex-row justify-right items-center bg-[rgba(235,_236,_250,_1.00)] border-custom drop-shadow-md p-5">

              <div className="w-[5%] h-full">
                <div className={`w-[50%] h-full bg-${ controlColor(cita.estado) } rounded-xl border-custom`}></div>
              </div>

              <div className="w-[50%] h-full">
                <div className="w-full h-[50%]">
                  <span className="font-montserrat text-3xl text-secundary"> {cita.nombre} </span>
                </div>
                <div className="w-full h-[50%]">
                  <span className="font-montserrat text-3xl text-terciary"> Codigo: {cita.codigo} </span>
                </div>
              </div>

              <div className="w-[50%] flex h-[50%]">
                <pre className="font-montserrat text-3xl text-secundary">Estado:  </pre>
                <span className={`font-montserrat text-3xl text-${ controlColor(cita.estado) }`}>{cita.estado}</span>
              </div>
              
              <div className="w-[50%] h-[50%]">
                <span className="font-montserrat text-3xl text-secundary"> Fecha: {cita.fecha} </span>
              </div>

              <Button variant="primario" text="Ver más" onClick={() => console.log('Botón clickeado')} />

            </div>
          </div>

        ))}

      </div>

      <div  className="w-full h-[10%] flex justify-center items-center" >
        <div className="w-[20%] h-[50%] flex flex-row justify-center items-center bg-[rgba(235,_236,_250,_1.00)] border-custom drop-shadow-md p-5">
          <div className="w-[50%] justify-right">
            <Button variant="primario" text="Ant." onClick={() => handleCambioIndice(false)} />
          </div>
          <div className="w-[50%] flex justify-end">
            <Button variant="primario" text="Sig." onClick={() => handleCambioIndice(true)} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default PageHistoricoDeCitas;
