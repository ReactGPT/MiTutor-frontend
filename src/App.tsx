import Landing from "./components/Landing";

import Login from "./login/Login";
import { useAuth } from "./context";
import { RouterProvider, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserAccountAuth } from "./store/hooks";

function App() {

  const {userData}=useAuth();


  const navigate = useNavigate();

  //  useEffect(() => {
  //   if (!userData.email||userData.email==='') navigate("/");
  // }, [userData]); 

  return (
    <>
    {/* <RouterProvider router={router}/> */}
      {!userData&&<Login/>}
      {userData&&<Landing/>}

    {/* <RouterProvider /> */}
    </>
  );
}

export default App;