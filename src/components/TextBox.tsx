type textBoxProps = {

    nombre: string;
    contenido: string;

};

const TextBox = ({nombre,contenido}: textBoxProps) => {

    return(
        <div>
            <div >
                <span className="font-roboto text-2xl text-primary">
                    {nombre}
                </span>
            </div>
            <div className="w-full h-1/2 p-2 border-custom shadow-custom bg-[rgba(237,_238,_250,_0.50)] font-roboto text-terciary">
                {contenido}
            </div>
        </div>
    );

};

export default TextBox;