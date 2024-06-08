import axios from 'axios';
import {Services as ServicesProperties} from '../../config';
import { Role } from '../types';



type ServiceResponse={
    success:boolean;
    data?:any;
    message?:string;
}
async function getUserInfo(email:string='',codigoPUCP:string=''):Promise<ServiceResponse>{
  
  try {
      const response = await axios({
          method: 'get',
          url: ServicesProperties.BaseUrl+`/userInfo?${email!==''?"email="+email:"codigoPUCP"+codigoPUCP}`,
          headers : ServicesProperties.Headers
      });
      if(!response.data.success){
          return {success:false,message:response.data.message};
      }
      const rolesList: Role[] = response.data.data.roles.map((item: any) => {
        
        const getDetails = ()=>{
            switch(item.type){
                case "TUTOR":
                    return{
                        isTutor:true,
                        tutorId:item.tutorId,
                        meetingRoom:item.meetingRoom
                    }
                case "STUDENT":
                    return{
                        isStudent:true,
                        isRisk:item.isRisk,
                        specialtyId:item.specialtyId,
                        specialtyName:item.specialtyName,
                        facultyId:item.facultyId,
                        facultyName:item.facultyName
                    }
                case "MANAGER":
                    return{
                        isManager:true,
                        departmentType:item.departmentType,
                        departmentId:item.departmentId,
                        departmentName:item.departmentName,
                        departmentAcronym:item.departmentAcronym
                    }
                case "ADMIN":
                    return{
                        isAdmin:true
                    }
            }
        } 
        return {
            accountTypeId:item.id,
            rolName:item.rolName,
            type:item.type,
            details: getDetails()
          };
        });
       
      return {success:true,data:{
        id:response.data.data.id,
        isVerified:response.data.data.isVerified,
        institutionalEmail:response.data.data.institutionalEmail,
        pucpCode:response.data.data.pucpCode,
        personInfo:{
            id:response.data.data.persona.id,
            name:response.data.data.persona.name,
            lastName:response.data.data.persona.lastName,
            secondLastName:response.data.data.persona.secondLastName,
            phone:response.data.data.persona.phone
        },
        roles:rolesList
      }};;
      
  } catch (err:any) {
    console.error(err);
    throw new Error(err.message);
  }

}

export {getUserInfo}