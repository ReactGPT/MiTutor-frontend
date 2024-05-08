import { useState } from "react";

type onChangeSimple = {
    tipo: "simple"
    onChange :(value:string|number)=>void;
}

type onChangeComplex = {
    tipo: "object"
    onChange : (value:string|number,name?:string)=>void;
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
    const [query,setQuery] = useState<string|number>(text);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setQuery(value);
        switch(onChange.tipo){
            case "simple":
                onChange.onChange(value);
                break
            case "object":
                onChange.onChange(value,name);
                break
        }
        
    };
    return (
        <div className={boxSize}>
            <input 
            className={`w-full mt-1 h-full px-3 py-2 rounded-md border focus:outline-none placeholder-text-xs text-xs ${(readOnly||disabled)&& "opacity-[0.6]"} ${!readOnly && "  focus:ring focus:border-blue-500"} ${right && "text-right"}`}
            type={type}
            name={name}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            value={query}
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