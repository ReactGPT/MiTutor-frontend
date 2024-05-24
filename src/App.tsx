
import Landing from "./components/Landing";

import Login from "./login/Login";
import { useAuth } from "./context";

function App() {
  //const [sucessLogin,setSucessLogin] = useState<boolean>(false);

  const {userData}=useAuth();
  
  
  return (
    <>
      {!userData.isAuthenticated&&<Login/>}
      {userData.isAuthenticated&&<Landing/>}
    </>
  );
}

export default App;
