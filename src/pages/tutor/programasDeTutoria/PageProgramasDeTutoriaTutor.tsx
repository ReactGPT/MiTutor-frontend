import TutoriaCard from "../../../components/TutoriaCard";

const PageProgramasDeTutoriaTutor = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6">

      <div className="bg-secondary flex divide-x-2 divide-primary  w-full h-10 rounded-xl border border-primary">

        <input className="w-full bg-transparent placeholder:text-gray-500 basis-1/4 rounded-l-xl px-2 py-1" placeholder="Programa de Tutoria o Código"/>

        <div className="basis-1/4 flex justify-center items-center gap-3 text-primary">
          <div className="w-full h-full px-10 bg-transparent">
            <select className="w-full h-full bg-transparent">
              <option>Ciencias e Ingeniería</option>
              <option>Contabilidad</option>
              <option>Derecho</option>
              <option>Artes</option>
            </select>
        </div>
          </div>
        <div className="basis-1/4 flex justify-center items-center gap-3 text-primary">
        <div className="w-full h-full px-10 bg-transparent">
            <select className="w-full h-full bg-transparent">
              <option>Ingeniería Informática</option>
              <option>Ingeniería Industrial</option>
              <option>Ingeniería Civil</option>
              <option>Ingeniería Geológica</option>
            </select>
        </div>
        </div>
        <div className="basis-1/4">
        <div className="w-full h-full px-10 bg-transparent">
            <select className="w-full h-full bg-transparent">
              <option>Tutor Fijo</option>
              <option>Tutor Variable</option>
            </select>
        </div>
        </div>
        <button className="grow-0 px-3 bg-primary text-white rounded-r-xl">+</button>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto flex-1">
        <TutoriaCard title="Tutoría de Cachimbos" description="Código: TC000000" facultad="Ciencias e Ingeniería" 
        especialidad="Ingeniería Informática" rol="Tutor Fijo"/>
        <TutoriaCard title="Tutoría General" description="Código: TF00000" facultad="Ciencias e Ingeniería" 
        especialidad="Ingeniería Industrial" rol="Tutor Variable"/>
        <TutoriaCard title="Tutoría de Cachimbos Ciencias" description="Código: TC00000" facultad="Contabilidad" 
        especialidad="Contabilidad Financiera" rol="Tutor Variable"/>
        <TutoriaCard title="Tutoría Maestrías" description="Código: TM00000" facultad="Contabilidad"
        especialidad="Contabilidad Financiera" rol="Tutor Variable"/> 
        <TutoriaCard title="Tutoría Futuro Laboral" description="Código: TF00000" facultad="Contabilidad"
        especialidad="Contabilidad Legal" rol="Tutor Variable"/> 
      </div>
      <div className="flex justify-center">
        <div className="flex border bg-white rounded-full overflow-clip ">
          <button className="border px-3 py-1.5 truncate w-20 text-center">Anterior</button>
          <button className=" bg-primary text-white  px-3">1</button>
          <button className="  px-3">2</button>
          <button className="  px-3">3</button>
          <button className="border px-3 py-1.5 truncate w-20 text-center">Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default PageProgramasDeTutoriaTutor;