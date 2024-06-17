type UnidadDerivacion = {
    unidadDerivacionId: number;
    nombre: string;
    siglas: string;
    responsable: string;
    email: string;
    telefono: string;
    estado: boolean;
    esPadre: boolean;
    fechaCreacion: string;
    parentId?: number;
};

export default UnidadDerivacion;