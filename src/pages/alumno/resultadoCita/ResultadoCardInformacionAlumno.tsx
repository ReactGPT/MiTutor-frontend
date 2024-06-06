import { HTMLProps } from 'react';

type Props = {
    cardTitle: string,
    emptyMessage?: string
} & HTMLProps<HTMLDivElement>

const ResultadoCardInformacionAlumno = ({ children, cardTitle, className, emptyMessage, ...props }: Props) => {
    return (
        <div className={'shadow shadow-primary/10 border-2 border-terciary flex flex-col gap-2 py-10 px-5 rounded-2xl bg-blue-50 ' + className} {...props}>
            <h2 className='text-2xl font-bold text-primary '>{cardTitle}</h2>
            <div className='border border-terciary rounded-2xl flex-1 min-h-56 bg-secondary/50 pt-5 text-primary text-lg font-medium'>
                {children ? children : <p className='text-center '>{emptyMessage}</p>}
            </div>
        </div>
    );
};

export default ResultadoCardInformacionAlumno;