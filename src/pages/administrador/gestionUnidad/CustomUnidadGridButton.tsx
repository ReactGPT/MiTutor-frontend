type CustomButtonParams = {
    onClick: ()=>void;
    icon: any;
    iconSize?:number;
}


export default function CustomUnidadGridButton({onClick,icon,iconSize=6}:CustomButtonParams) {
    const Icon = icon;
    return (
        <button onClick={onClick}>
            <Icon className={`h-${iconSize} w-${iconSize}`}/>
        </button>
  )
}