import TextBox from "../../../components/TextBox";
import { Button } from "../../../components";



const PageDetalleDeCita = () => {

    const debugClick = () => {
        console.log('boton clickeado')
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-1/2 p-2">
                <div className="w-full h-full p-5 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
                    <div className="w-full h-1/5">
                        <span className="font-montserrat text-4xl font-bold text-primary">Datos Tutoria</span>
                    </div>
                    <div className="w-full flex h-1/4">
                        <div className="w-full h-full p-2">
                            <TextBox nombre='Nombre' contenido='Tutoria con Martina Solis'/>
                        </div>
                        <div className="w-full h-full p-2">
                            <TextBox nombre='Facultad' contenido='Ciencias e ingenieria'/>
                        </div>
                        <div className="w-full h-full p-2">
                            <TextBox nombre='Especialidad' contenido='Ingenieria Informatica'/>
                        </div>
                    </div>
                    <div className="w-full flex h-1/4">
                        <div className="w-1/2 h-full p-2">
                            <TextBox nombre='Descripcion' contenido='Descripcion de la tutoria'/>
                        </div>
                    </div>
                    <div className="w-full h-1/4">
                        <div className="w-full h-full flex items-center justify-center">
                            <Button onClick={debugClick} variant="primario" text="Solicitar cita"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-1/2 flex">
                <div className="w-1/4 h-full p-2">
                    <div className="w-full h-full p-5 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
                        <div className="w-full h-1/6">
                            <span className="font-montserrat text-3xl font-bold text-primary">Tutor</span>
                        </div>
                        <div className="w-full h-5/6">
                            <div className="w-full h-full border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
                                <div className="w-full h-4/6 bg-[rgba(_0,_0,_255,_0.50)] rounded-t-xl">

                                </div>
                                <div className="w-full h-1/6 mb-3">
                                    <span className="font-montserrat flex p-2 text-2xl font-bold text-primary">Martina Rosa Solis Ramos</span>
                                </div>
                                <div className="w-full h-1/6">
                                    <span className="font-montserrat flex p-2 text-1xl font-bold text-terciary">Docente a tiempo completo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 h-full p-2">
                    <div className="w-full h-full p-5 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
                        <div className="w-full h-2/8 items-center">
                            <span className="font-montserrat text-3xl font-bold text-primary">Plan de Acción</span>
                        </div>
                        <div className="w-full h-3/4 p-5">
                            <div className="w-full h-full border-custom shadow-custom bg-[rgba(237,_238,_250,_0.50)] font-roboto">
                                <div className="w-full h-1/4 flex">
                                    <div className="flex items-center justify-center h-50 w-1/4">
                                        <span className="font-montserrat flex text-3xl font-bold text-secundary justify-center">Nombre</span>
                                    </div>
                                    <div className="w-3/4 h-full p-3">
                                        <div className="w-1/2 h-full border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">

                                        </div>
                                    </div> 
                                </div>
                                <div className="w-full h-3/4 flex">
                                    <div className="flex items-center justify-center h-40 w-1/4">
                                        <span className="font-montserrat flex text-3xl font-bold text-secundary justify-center">Descripción</span>
                                    </div>
                                    <div className="w-3/4 h-full p-3">
                                        <div className="w-full h-full border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
                                            
                                        </div> 
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-2/8">
                            <div className="w-full h-full flex items-center justify-center">
                                <Button onClick={debugClick} text="Ver compromisos"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );

}

export default PageDetalleDeCita;