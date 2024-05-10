import { useState } from "react";

type onChangeSimple = {
    tipo: "simple"
    onChange :(value:any)=>void;
}

type onChangeComplex = {
    tipo: "object"
    onChange : (name:string,value:any)=>void;
}
type InputCellProps = {
    text?: string|number;
    boxSize: string;
    readOnly? :boolean;
    disabled?:boolean;
    type?:string;
    placeholder?:string;
    name?:string;
    onChange:onChangeComplex|onChangeSimple;
    right?:boolean;
}

function InputCell({
    text ='',
    boxSize,
    readOnly = false,
    disabled = false,
    type = 'string',
    placeholder='',
    name='',
    onChange,   
    right=false
}:InputCellProps){
    //console.log(text);
    const [query,setQuery] = useState<string|number>(text);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setQuery(value);
        switch(onChange.tipo){
            case "simple":
                onChange.onChange(type!=='string'?parseInt(value):value);
                break;
            case "object":
                onChange.onChange(name,type!=='string'?parseInt(value):value);
                break;
        }
        
    };
    return (
        <div className={boxSize}>
            <input 
            className={`w-full h-full px-3 py-2 rounded-md border focus:outline-none placeholder-text-xs text-xs ${(readOnly||disabled)&& "opacity-[0.6]"} ${!readOnly && "  focus:ring focus:border-blue-500"} ${right && "text-right"}`}
            type={type}
            name={name}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            value={text}
            onChange={handleChange}
            >       
            </input>
        </div>
    )



}

export default InputCell


/*
const sizeClasses : Record<string,string> = {
        xs:'small',
        sm:'small',
        md:'medium'
    };

*/