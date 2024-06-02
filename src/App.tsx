import Landing from "./components/Landing";
import Login from "./login/Login";
import { useAuth } from "./context";

function App() {
  const { userData } = useAuth();
  return (
    <>
      {!userData && <Login />}
      {userData && <Landing />}
    </>
  );
}

export default App;