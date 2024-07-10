import { useAuth } from '../../context';
import { TutorRoleDetails, UserAccount } from '../../store/types';

  const getTutorId = (userData: { username: string; email: string; imageUrl: string; isLogged: boolean; token: string; userInfo: UserAccount | null; } | null) => {
    // Verifica que userData y userInfo existan
    if (userData && userData.userInfo) {
        // Encuentra el rol con type "TUTOR"
        const tutorRole = userData.userInfo.roles.find(role => role.type === "TUTOR");

        if (tutorRole && tutorRole.details) {
            console.log("Tutor ID:", (tutorRole.details as TutorRoleDetails).tutorId);
            return (tutorRole.details as TutorRoleDetails).tutorId;
        }
    } 
    return 0;
  };

  /*const fetchBasedOnUserRole = (userRole: string, fetchStudents: () => Promise<void>, id?: string) => {
    switch (userRole) {
      case "ADMIN":
        // Realizar fetch para admin
        fetchStudents();
        break;
      case "SPECIALTYMANAGER":
        // Realizar fetch para specialty manager
        // fetchSpecialtyManagerData(id);
        break;
      case "FACULTYMANAGER":
        // Realizar fetch para faculty manager
        // fetchFacultyManagerData(id);
        break;
      default:
        console.error("Rol de usuario no reconocido");
    }
  };
  

  const getTypeUser = (userData: { username: string; email: string; imageUrl: string; isLogged: boolean; token: string; userInfo: UserAccount | null; } | null, fetchStudents: () => Promise<void>) => {
    if (userData && userData.userInfo) {
      const roles = userData.userInfo.roles;
      const adminRole = roles.find(role => role.type === "ADMIN");
      const specialtyManagerRole = roles.find(role => role.type === "SPECIALTYMANAGER");
      const facultyManagerRole = roles.find(role => role.type === "FACULTYMANAGER");

      if (adminRole) {
        fetchBasedOnUserRole("ADMIN", fetchStudents, undefined);
      } else if (specialtyManagerRole && specialtyManagerRole.details && specialtyManagerRole.details.specialtyId) {
        fetchBasedOnUserRole("SPECIALTYMANAGER", fetchStudents, specialtyManagerRole.details);
      } else if (facultyManagerRole && facultyManagerRole.details && facultyManagerRole.details.facultyId) {
        fetchBasedOnUserRole("FACULTYMANAGER", facultyManagerRole.details.facultyId, fetchStudents);
        roles.forEach(role => {
          if (role.rolName === 'Responsable de Facultad') {
              const facultyId = parseInt((role.details as any).departmentId, 10);
              programaTutoriaData.forEach(programa => {
                  if (typeof programa.id === 'number' && programa.facultadId === facultyId) {
                      if (!uniqueProgramIds.has(programa.id)) {
                          uniqueProgramIds.add(programa.id);
                          filteredData.push(programa);
                      }
                  }
              });
          }
      });
      } else {
        console.error("No se pudo determinar el rol o no se proporcionó un ID válido");
      }
    } else {
      console.error("No se encontraron datos de usuario válidos");
    }
  };
*/
export {getTutorId};