import { HTMLProps } from 'react'

type InputAlumno = HTMLProps<HTMLInputElement>

const InputAlumno = ({className,...props}:InputAlumno) => {
  return (
    <input type="text" 
    className={"w-full px-3 py-2 font-montserrat bg-slate-100 border-custom drop-shadow-md font-bold "+className}
    style={{
        borderRadius: '15px',
    }}
   {...props}
   />
  )
}

export default InputAlumno