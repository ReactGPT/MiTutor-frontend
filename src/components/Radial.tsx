import React from 'react'

type InputProps={
    boxSize:string;
    size?:number;
    checked?:boolean;
    onChange:()=>void;
    label?:string;
    left?:boolean;
    margin?:number;
}
function Radial({boxSize,size=4,checked=false,onChange,label="",left=false,margin=2}:InputProps) {
  return (
    <div className={`flex items-center flex-row ${boxSize} `}>
        {left &&<label htmlFor={`radial-${label}`} className={`me-${margin} text-sm font-medium text-primary dark:text-gray-300`}>{label}</label>}
        <input checked={checked} onChange={onChange} id={`radial-${label}`} type="radio" 
        name={label} 
        className={`w-${size} h-${size} text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600`}/>
        {!left &&<label htmlFor={`radial-${label}`} className={`ms-${margin} text-sm font-medium text-primary dark:text-gray-300`}>{label}</label>}
    </div>
  )
}

export default Radial