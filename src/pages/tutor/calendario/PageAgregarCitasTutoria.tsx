import { Datepicker } from 'flowbite-react';

const PageAgregarCitasTutoria = () => {
  return (
    <div className="flex flex-col w-full h-full border-custom p-5 gap-5 overflow-auto">
      <div className="w-full h-1/3 border-custom p-5">
        <label className="font-montserrat font-bold text-2xl">Datos</label>

        <div>
          <label className="block text-base font-roboto text-primary">Fecha</label>
          <input
            type="date"
            onChange={() => { }}
            className="border-custom py-1 px-2"
            disabled
          />
        </div>

        <div>
          <label className="block text-base font-roboto text-primary">Hora Inicio</label>
          <input
            type="time"
            onChange={() => { }}
            className="border-custom py-1 px-2"
            disabled
          />
        </div>

      </div>
      <div className="w-full h-2/3 border-custom p-5">
        <Datepicker inline language='es-PE' showClearButton={false} showTodayButton={false} />
      </div>
    </div>
  );
};

export default PageAgregarCitasTutoria;