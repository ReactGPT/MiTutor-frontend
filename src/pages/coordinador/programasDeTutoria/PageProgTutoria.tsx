import React from 'react'
import { Button } from '../../../components'
import ProgramaTutoriaBox1 from './ProgramaTutoriaBox1'
import ProgramaTutoriaBox2 from './ProgramaTutoriaBox2'


export default function PageProgTutoria() {
  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div id="ProgramaTutoriaBox1" className='flex flex-col gap-2 w-full h-[30%] border-custom drop-shadow-md p-4'>
        <ProgramaTutoriaBox1/>
      </div>
      <div id="ProgramaTutoriaBox2" className='flex flex-row w-full h-[70%]'>
        <ProgramaTutoriaBox2/>
      </div>
    </div>
  )
}


