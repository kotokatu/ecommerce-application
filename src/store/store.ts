import { makeAutoObservable } from 'mobx';

interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

const LOCALSTORAGE_KEY = 'check';

export class Store {
  user = {} as IUser;
  isAuth = false;
  accsess_token: string;
  //accsess_token это все убрать это пробно
  constructor(accsess_token: string) {
    this.accsess_token = accsess_token;
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      //тут запрос
      console.log(this.accsess_token);
      localStorage.setItem(LOCALSTORAGE_KEY, this.accsess_token);
      this.setAuth(true);
      this.setUser({ email: '', isActivated: true, id: '' });
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    try {
      //тут запрос
      localStorage.removeItem(LOCALSTORAGE_KEY);
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (err) {
      console.log(err);
    }
  }
}
