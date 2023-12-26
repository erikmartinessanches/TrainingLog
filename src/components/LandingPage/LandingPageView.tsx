import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface Props {
  toSignUp: () => void;
  toLogIn: () => void;
}

//Navigating is ok from the View.
function LandingPageView({ toSignUp, toLogIn }: Props) {
  function toSignUpACB() {
    toSignUp();
  }

  console.log(`Hello from ${import.meta.env.VITE_APP_HELLO} environment!`);

  function toLogInACB() {
    toLogIn();
  }
  return (
    <div className="App">
      <h2>App view (front page)</h2>
      <Button variant="contained" onClick={toSignUpACB} id="register">
        Sign-up
      </Button>
      <Button variant="contained" onClick={toLogInACB} id="login">
        Log in
      </Button>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/terms">Terms of Service</Link>
    </div>
  );
}

export default LandingPageView;
