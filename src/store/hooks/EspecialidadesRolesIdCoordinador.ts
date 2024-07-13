import { ManagerRoleDetails, UserAccount } from '../../store/types';

type UserData = {
  username: string;
  email: string;
  imageUrl: string;
  isLogged: boolean;
  token: string;
  userInfo: UserAccount | null;
};

const isManagerRoleDetails = (details: any): details is ManagerRoleDetails => {
  return (details as ManagerRoleDetails).departmentId !== undefined &&
    (details as ManagerRoleDetails).departmentType === 'Especialidad';
};

const getEspecialidadesFromRoleCoordinador = (userData: UserData | null) => {
  if (userData && userData.userInfo) {
    const specialtyManagers = userData.userInfo.roles.filter(item => item.type === "SPECIALTYMANAGER");

    const uniqueSpecialtyManagers: ManagerRoleDetails[] = [];
    const seenDepartmentIds = new Set<number>();

    specialtyManagers.forEach(item => {
      if (isManagerRoleDetails(item.details)) {
        const departmentId = Number(item.details.departmentId);
        if (!seenDepartmentIds.has(departmentId)) {
          seenDepartmentIds.add(departmentId);
          uniqueSpecialtyManagers.push(item.details);
        }
      }
    });

    if (uniqueSpecialtyManagers.length === 0) {
      uniqueSpecialtyManagers.push(userData.userInfo.roles[0].details as ManagerRoleDetails);
    }

    return uniqueSpecialtyManagers;
  }
  else return [];
};

export { getEspecialidadesFromRoleCoordinador };