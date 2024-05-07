  import React from 'react'

  const InputFile = ({ onFileUpload }) => {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      onFileUpload(file);
    };
        
    return (
      <div className="flex flex-col items-start gap-10 self-stretch relative">
        <label className="absolute top-0 right-0 text-xs font-semibold text-red-500">
          .xlsx, .csv <span className="text-system-red">*</span>
        </label>
        <div className="flex flex-col items-start gap-10 self-stretch p-12 rounded-lg border-2 border-red-600 bg-gradient-to-r from-blue-200 to-purple-200">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <label className="cursor-pointer flex items-center gap-2">
            <span className="text-primary-500">Seleccionar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.707 6.293a1 1 0 0 1 1.414-1.414L10 10.586l6.879-6.88a1 1 0 0 1 1.414 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-7.5-7.5a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Cargar
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Eliminar
          </button>
        </div>
      </div>
    )
  }

  export default InputFile
