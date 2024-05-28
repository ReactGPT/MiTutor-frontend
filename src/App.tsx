
import Landing from "./components/Landing";

import Login from "./login/Login";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const {userData}=useAuth();
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userData.isAuthenticated) navigate("/");
  },[userData.isAuthenticated])
  
  return (
    <>
      {!userData.isAuthenticated&&<Login/>}
      {userData.isAuthenticated&&<Landing/>}
    </>
  );
}

export default App;
