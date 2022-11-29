import "./App.css";
import { app, database } from "../persistence/Persistence";
import AppView from "../views/AppView";

function App() {
  function toSignUp(params) {
    console.log("To sign up view, use react-router-dom...");
  }

  return <AppView /*toSignUp={toSignUp}*/></AppView>;
}

export default App;
