import { Button } from '../../../components';
import { SaveIcon, TrashIcon } from '../../../assets';
function ProgramaTutoriaBox1() {
  return (
    <>
      <div id="ProgramaTutoriaBox1Header" className='flex flex-row justify-between w-full'>
        <h2 className='text-xl font-bold text-primary'>Datos del programa</h2>
        <div className='flex flex-row gap-4'>
          <Button text='Guardar' icon={SaveIcon} onClick={() => { }} />

          <Button text='Cancelar' icon={TrashIcon} onClick={() => { }} />
        </div>
      </div>
      <div id='ProgramaTutoriaBox1Content' className='flex flex-row w-full'>
        <div id='ProgramaTutoriaBox1ContentTutoria' className='flex flex-col w-[30%]'>
          Nombre Tutoria
        </div>
        <div id='ProgramaTutoriaBox1ContentDescripcion' className='flex w-[70%] flex-col'>

          <label htmlFor="message"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            Descripción
          </label>
          <textarea id="message"
            rows={4}
            className="block p-2.5 w-full max-h-[150px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej: La tutorías de cachimbos es para..."
          />

        </div>
      </div>


    </>
  );
}

export default ProgramaTutoriaBox1;