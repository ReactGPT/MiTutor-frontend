import React from 'react'


type InputProps={
    text:string;
    onChange:()=>void;
    value:boolean;
    boxSize?:string;
}

function Toogle({text,onChange,value,boxSize}:InputProps) {
  return (
    
<label className={`inline-flex items-center cursor-pointer ${!!boxSize&& boxSize}`}>
<input type="checkbox" checked={value} className="sr-only peer" onChange={onChange}/>
    <span className="font-roboto text-base text-primary">{text}</span>
    <div className="ms-3 relative w-9 h-5  bg-gray-200 peer-checked:bg-primary peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-secondary after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 "></div>
  

</label>

  )
}

export default Toogle