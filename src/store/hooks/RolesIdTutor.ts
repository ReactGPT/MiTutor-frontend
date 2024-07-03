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

export {getTutorId};