type InputProps = {
    titulo?: string;
    texto?: string;
    enable?: boolean;
};

const InputTutor = ({ titulo = "", texto = "", enable = true }: InputProps) => {
    return (
        <li className="drop-shadow-md p-5 flex items-center  space-x-5 height-100% personalizado"
            style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "flex-start" }}>
            <label htmlFor="">{titulo}</label>
            <input type="text"
                className="w-full px-3 py-2 mt-1 font-roboto text-[90%] bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-bold"
                style={{ height: "100%", marginLeft: "0" }}
                placeholder={texto}
                disabled={!enable} />
        </li>
    );
};

export default InputTutor;