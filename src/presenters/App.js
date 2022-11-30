import "./App.css";
import { app, database } from "../persistence/Persistence";
import AppView from "../views/AppView";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  function toSignUp() {
    navigate("/signup");
  }

  function toLogIn() {
    navigate("/login");
  }

  return <AppView toSignUp={toSignUp} toLogIn={toLogIn}></AppView>;
}

export default App;
