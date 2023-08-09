import { useState } from 'react';
import { Link } from 'react-router-dom';

type RegistrationProps = {
  onSignup: (username: string, password: string) => void;
};

const RegistrationPage = ({ onSignup }: RegistrationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <>
      <form>
        <div>
          <label>E-mail</label>
          <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <input className="btn btn-block" type="button" value="Sign up" onClick={() => onSignup(email, password)} />
        <Link to="/login">To Login Page</Link>
      </form>
    </>
  );
};

export default RegistrationPage;
