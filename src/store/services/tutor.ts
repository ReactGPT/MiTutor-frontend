import axios from 'axios';
import {Services as ServicesProperties} from '../../config';
import { Tutor } from '../types';

type ServiceResponse={
    success:boolean;
    data?:any;
    message?:string;
} 

async function postCrearTutores(tutores:Tutor[]):Promise<ServiceResponse>{

    try{
        
        const listaTutores = tutores.map((tutor)=>{
            return {
                TutorId: tutor.idTutor,
                MeetingRoom:tutor.meetingRoom,
                UserAccount: {
                    Id:tutor.userAccountId
                }
            }
        });
        console.log(listaTutores);
        const response = await axios({
            method: 'post',
            url: ServicesProperties.BaseUrl+`/crearTutorBatch`,
            headers : ServicesProperties.Headers,
            data: listaTutores
        });
        return {success:response.data.success,message:response.data.message}
    }
    catch (err:any){
        console.error(err);
        throw new Error(err.message);
    }
}

export {postCrearTutores}