import * as React from 'react';
import { useState, useEffect } from 'react';
import { CustomCellRendererProps } from "@ag-grid-community/react";

type CustomButtonParams = {
    onClick: ()=>void;
    icon: any;
    iconSize?:number;
}


export default function CustomUsuariosGridButton({onClick,icon,iconSize=6}:CustomButtonParams) {
    const Icon = icon;
    return (
        <button onClick={onClick}>
            <Icon className={`h-${iconSize} w-${iconSize}`}/>
        </button>
        
  )
}