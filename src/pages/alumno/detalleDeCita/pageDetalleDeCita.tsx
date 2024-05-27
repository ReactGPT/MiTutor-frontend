import TextBox from "../../../components/TextBox";
import { Button } from "../../../components";
import { Navigate, useNavigate } from "react-router-dom";



const PageDetalleDeCita = () => {
  const navigate = useNavigate();


  const goToTutorList = () => {
    navigate('/solicitarTutor', { state: { idProgram: 1 } });
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">

      {/*Datos Tutoria*/}
      <div className="w-full h-[44%] p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
        <span className="font-montserrat text-2xl font-bold text-primary">Datos Tutoria</span>

        <div className="w-full flex gap-5">
          <TextBox className="w-full" nombre='Nombre' contenido='Tutoria con Martina Solis' />
          <TextBox className="w-full" nombre='Facultad' contenido='Ciencias e ingenieria' />
          <TextBox className="w-full" nombre='Especialidad' contenido='Ingenieria Informatica' />
        </div>

        <div className="w-full flex">
          <TextBox className="w-1/2" nombre='Descripcion' contenido='Descripcion de la tutoria' />
        </div>

        <div className="w-full flex items-center justify-center p-2">
          <Button onClick={goToTutorList} variant="primario" text="Solicitar cita" />
        </div>

      </div>

      <div className="w-full flex h-[56%] gap-5">
        {/*tutor*/}
        <div className="flex flex-col w-[30%] h-full p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
          <span className="font-montserrat text-2xl font-bold text-primary">Tutor</span>
          {/*Tutor Card */}
          {/* <div className="w-full h-full border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
            <div className="w-full h-4/6 bg-[rgba(_0,_0,_255,_0.50)] rounded-t-xl">

            </div>
            <div className="w-full h-1/6 mb-3">
              <span className="font-montserrat flex p-2 text-2xl font-bold text-primary">Martina Rosa Solis Ramos</span>
            </div>
            <div className="w-full h-1/6 ">
              <span className="font-montserrat flex p-2 text-1xl font-bold text-terciary">Docente a tiempo completo</span>
            </div>
          </div> */}
        </div>

        {/*Plan de Accion*/}
        <div className="flex flex-col w-[70%] h-full p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
          <span className="font-montserrat text-2xl font-bold text-primary">Plan de Acción</span>

          <div className="w-full h-full">
            <div className="flex p-3 w-full h-full border-custom shadow-custom bg-[rgba(237,_238,_250,_0.50)] font-roboto">
              <div className="w-[30%] flex flex-col gap-3">
                <span className="h-[30%] font-montserrat flex text-xl font-bold text-secundary justify-center">Nombre</span>
                <span className="h-[70%] font-montserrat flex text-xl font-bold text-secundary justify-center">Descripción</span>
              </div>
              <div className="w-[70%] flex flex-col gap-3">

                <div className=" h-[30%] w-full">
                  <div className="w-full h-full border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">

                  </div>
                </div>

                <div className="h-[70%] w-full">
                  <div className="w-full h-full border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">

                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Button onClick={() => { }} text="Ver compromisos" />
          </div>
        </div>

      </div>
    </div>

  );
};

export default PageDetalleDeCita;