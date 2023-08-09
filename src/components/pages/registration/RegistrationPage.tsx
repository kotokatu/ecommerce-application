import { useState } from 'react';
import { Link } from 'react-router-dom';

type RegistrationProps = {
  onLogin: (username: string, password: string) => void;
  onSignup: (username: string, password: string) => void;
  onLogout: () => void;
};

const RegistrationPage = ({ onLogin, onSignup, onLogout }: RegistrationProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <form className="add-form">
        <div className="form-control">
          <label>Name</label>
          <input type="text" placeholder="name" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input className="btn btn-block" type="button" value="Login" onClick={() => onLogin(username, password)} />
        <input className="btn btn-block" type="button" value="Sign up" onClick={() => onSignup(username, password)} />
        <input className="btn btn-block" type="button" value="Logout" onClick={onLogout} />
        <Link to="/login">To Login Page</Link>
      </form>
    </>
  );
};

export default RegistrationPage;
