import { useContext } from 'react';
import { AuthContext } from '../../routes/AuthProvider';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
