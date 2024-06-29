import React from 'react'


type InputProps={
    text:string;
    onChange:()=>void;
    value:boolean;
    boxSize?:string;
    name:string;
    enable?:boolean;
}

function ToggleAdmin({text,onChange,value,boxSize,name,enable}:InputProps) {
  return (
    
<label className={`inline-flex items-center cursor-pointer ${!!boxSize&& boxSize}`}>
<input type="checkbox" checked={value} name={name} className="sr-only peer" onChange={onChange} disabled={!enable}/>
    <span className="font-roboto text-base text-primary">{text}</span>
    <div className={enable ? `ms-3 relative w-9 h-5  bg-gray-200 peer-checked:bg-primary peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-secondary after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 ` : 
      `ms-3 relative w-9 h-5  bg-gray-200 peer-checked:bg-gray-400 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-secondary after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 ` 
     }></div>
  

</label>

  )
}

export default ToggleAdmin