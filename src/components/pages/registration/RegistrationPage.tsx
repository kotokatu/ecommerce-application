import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../../services/UserService/UserService';

type RegistrationPageProps = {
  onSignup: Dispatch<SetStateAction<boolean>>;
};

const RegistrationPage = ({ onSignup }: RegistrationPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await userService.signup(email, password);
      onSignup(true);
    } catch {
      console.log('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>E-mail</label>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>First Name</label>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
        />
      </div>
      <input className="btn btn-block" type="submit" value="Sign up" />
      <Link to="/login">To Login Page</Link>
    </form>
  );
};

export default RegistrationPage;
