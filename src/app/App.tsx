import './App.scss';
import { useState } from 'react';
import ApiRoot from '../services/api/ApiRoot';
import Registration from '../components/pages/registration/Registration';

export interface User {
  apiRoot: ApiRoot;
  isLoggedIn: boolean;
}

function App() {
  const [user, setUser] = useState<User>({ apiRoot: new ApiRoot(), isLoggedIn: false });

  async function loginUser(username: string, password: string) {
    // try {
    await user.apiRoot.login(username, password);
    setUser({ apiRoot: new ApiRoot({ username, password }), isLoggedIn: true });
    // } catch {
    // console.log('error');
    // }
  }

  async function signupUser(username: string, password: string) {
    user.apiRoot
      .signup(username, password)
      .then(() => {
        setUser({ apiRoot: new ApiRoot({ username, password }), isLoggedIn: true });
      })
      .catch((err: Error) => console.log(err.message));
  }

  function logoutUser() {
    setUser({ apiRoot: new ApiRoot(), isLoggedIn: false });
  }

  async function getUserInfo() {
    user.apiRoot.apiRoot.me().get().execute();
  }

  return (
    <>
      <Registration onLogin={loginUser} onSignup={signupUser} onLogout={logoutUser} onGetUserInfo={getUserInfo} />
    </>
  );
}

export default App;
