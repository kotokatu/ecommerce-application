import { Cart } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type AuthContextType = {
  userLoggedIn: boolean;
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  cart: Cart | null;
  setCart: Dispatch<SetStateAction<Cart | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  userLoggedIn: false,
  setUserLoggedIn: useState,
  cart: null,
  setCart: useState,
});

type AuthProviderProps = {
  children: React.ReactNode;
  userLoggedIn: boolean;
  setUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  cart: Cart | null;
  setCart: Dispatch<SetStateAction<Cart | null>>;
};

const AuthProvider = ({ children, userLoggedIn, setUserLoggedIn, cart, setCart }: AuthProviderProps) => {
  const value = { userLoggedIn, setUserLoggedIn, cart, setCart };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
