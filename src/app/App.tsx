import './App.scss';
import { useState } from 'react';
import ApiRoot from '../../utils/libs/sdk/ApiRoot';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({ apiRoot: new ApiRoot(), isLoggedIn: false });

  return (
    <form className="add-form">
      <div className="form-control">
        <label>Name</label>
        <input type="text" placeholder="name" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <input
        className="btn btn-block"
        type="button"
        value="Login"
        onClick={async () => {
          try {
            await user.apiRoot.login(username, password);
            setUser({ apiRoot: new ApiRoot({ username, password }), isLoggedIn: true });
          } catch {
            console.log('error');
          }
        }}
      />
      <input
        className="btn btn-block"
        type="button"
        value="Sign up"
        onClick={async () => {
          user.apiRoot
            .signup(username, password)
            .then(() => {
              setUser({ apiRoot: new ApiRoot({ username, password }), isLoggedIn: true });
            })
            .catch((err) => console.log(err.message));
        }}
      />
      <input
        className="btn btn-block"
        type="button"
        value="Logout"
        onClick={async () => {
          setUser({ apiRoot: new ApiRoot(), isLoggedIn: false });
        }}
      />
      <input
        className="btn btn-block"
        type="button"
        value="getUser"
        onClick={async () => {
          user.apiRoot.apiRoot.me().get().execute();
        }}
      />
    </form>
  );
}

export default App;
