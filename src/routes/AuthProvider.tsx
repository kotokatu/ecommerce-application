import { Dispatch, SetStateAction, createContext, useState } from 'react';

type AuthContextType = {
  userLoggedIn: boolean;
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({ userLoggedIn: false, setUserLoggedIn: useState });

type AuthProviderProps = {
  children: React.ReactNode;
  userLoggedIn: boolean;
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const AuthProvider = ({ children, userLoggedIn, setUserLoggedIn }: AuthProviderProps) => {
  const value = { userLoggedIn, setUserLoggedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
