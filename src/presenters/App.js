import "./App.css";
import { app, database } from "../persistence/Persistence";
import AppView from "../views/AppView";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  function toSignUp(params) {
    navigate("/signup");
  }

  return <AppView toSignUp={toSignUp}></AppView>;
}

export default App;
