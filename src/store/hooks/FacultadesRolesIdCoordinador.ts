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
    (details as ManagerRoleDetails).departmentType === 'Facultad';
};

const getFacultadesFromRoleCoordinador = (userData: UserData | null) => {
  if (userData && userData.userInfo) {
    const facultyManagers = userData.userInfo.roles.filter(item => item.type === "FACULTYMANAGER");

    const uniqueFacultyManagers: ManagerRoleDetails[] = [];
    const seenDepartmentIds = new Set<number>();

    facultyManagers.forEach(item => {
      if (isManagerRoleDetails(item.details)) {
        const departmentId = Number(item.details.departmentId);
        if (!seenDepartmentIds.has(departmentId)) {
          seenDepartmentIds.add(departmentId);
          uniqueFacultyManagers.push(item.details);
        }
      }
    });

    if (uniqueFacultyManagers.length === 0) {
      uniqueFacultyManagers.push(userData.userInfo.roles[0].details as ManagerRoleDetails);
    }

    return uniqueFacultyManagers;
  }
  else return [];
};

export { getFacultadesFromRoleCoordinador };