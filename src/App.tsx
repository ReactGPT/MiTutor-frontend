
import Landing from "./components/Landing";

import Login from "./login/Login";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  //const [sucessLogin,setSucessLogin] = useState<boolean>(false);

  const { userData } = useAuth();

  const navigate = useNavigate();

<<<<<<< HEAD
  /* useEffect(() => {
    if (!userData.isAuthenticated) navigate("/");
  }, [userData.isAuthenticated]); */

=======
  // useEffect(()=>{
  //   if(!userData.isAuthenticated) navigate("/");
  // },[userData.isAuthenticated])
  
>>>>>>> e56a158 (pantalla detalle de citas variable)
  return (
    <>
      {/* {!userData.isAuthenticated&&<Login/>}
      {userData.isAuthenticated&&<Landing/>}  */}
<<<<<<< HEAD
      <Landing />
=======
      <Landing/>
>>>>>>> e56a158 (pantalla detalle de citas variable)
    </>
  );
}

export default App;
