import './App.css';
import LandingPageView from './LandingPageView';
import { useNavigate } from 'react-router-dom';
//My landing page.
function App() {
  const navigate = useNavigate();

  function toSignUp() {
    navigate('/signup');
  }

  function toLogIn() {
    navigate('/login');
  }

  return (
    <LandingPageView toSignUp={toSignUp} toLogIn={toLogIn}></LandingPageView>
  );
}

export default App;
