interface InputProps {
    texto: string;
}

const InputTutor: React.FC<InputProps> = ({ texto }) => {
    return (
        <li className="drop-shadow-md p-5 flex items-center  space-x-5">
            <label htmlFor="">{texto}</label>
            <input type="text" 
                className="w-full px-3 py-2 mt-1 font-montserrat text-[90%] bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-bold "
                placeholder="Escribe aquí..." />
        </li>
    );
};

export default InputTutor;