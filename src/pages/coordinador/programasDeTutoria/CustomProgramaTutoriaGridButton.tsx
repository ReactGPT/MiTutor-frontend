import * as React from 'react';
import { useState, useEffect } from 'react';
import { CustomCellRendererProps } from "@ag-grid-community/react";

interface CustomButtonParams extends CustomCellRendererProps{
    onClick: ()=>void;
    icon: any;
    iconSize?:number;
}


export default function CustomProgramaTutoriaGridButton({onClick,icon,iconSize=6}:CustomButtonParams) {
    const Icon = icon;
    return (
        <button onClick={onClick}>
            <Icon className={`h-${iconSize} w-${iconSize}`}/>
        </button>
        
  )
}
