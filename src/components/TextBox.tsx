type textBoxProps = {
  nombre: string;
  contenido: string;
  className?: string;
};

const TextBox = ({ nombre, contenido, className }: textBoxProps) => {
  return (
    <div className={className}>
      <div >
        <span className="font-roboto text-lg text-primary">
          {nombre}
        </span>
      </div>
      <div className="text-base w-full h-1/2 p-1 px-3 border-custom shadow-custom bg-[rgba(237,_238,_250,_0.50)] font-roboto text-terciary">
        {contenido}
      </div>
    </div>
  );

};

export default TextBox;