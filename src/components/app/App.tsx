import './App.scss';
import { useState } from 'react';
import { createApiCustomerRoot, login, signup } from '../../utils/libs/sdk/customerCallFunctions';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { anonymousApiRoot } from '../../utils/libs/sdk/BuildClients';

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [customer, setCustomer] = useState<ByProjectKeyRequestBuilder>(anonymousApiRoot);

  return (
    <form className="add-form">
      <div className="form-control">
        <label>Name</label>
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <input
        className="btn btn-block"
        type="button"
        value="Login"
        onClick={() => {
          setCustomer(createApiCustomerRoot(name, password));
          login(customer, name, password);
        }}
      />
      <input className="btn btn-block" type="button" value="Sign up" onClick={() => signup(customer, name, password)} />
    </form>
  );
}

export default App;
