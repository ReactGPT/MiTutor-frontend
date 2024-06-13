import { HTMLProps } from 'react';

type Props = {
  cardTitle: string,
  emptyMessage?: string;
} & HTMLProps<HTMLDivElement>;

const ResultadoCardInformacionAlumno = ({ children, cardTitle, className, emptyMessage, ...props }: Props) => {
  return (
    <div className={'w-full h-full shadow shadow-primary/10 border-2 border-terciary flex flex-col gap-5 p-5 rounded-2xl bg-blue-50 ' + className} {...props}>
      <h2 className='text-2xl font-bold'>{cardTitle}</h2>
      <div className='border border-terciary rounded-2xl flex-1 min-h-56 bg-secondary/50 p-5 text-primary text-lg font-medium overflow-auto'>
        {children ? children : <p className='text-center '>{emptyMessage}</p>}
      </div>
    </div>
  );
};

export default ResultadoCardInformacionAlumno;