import setActiveLink from '../../../utils/helpers/set-active-link';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo logo">
        <NavLink className="logo__link" to="/">
          <h1 className="logo__title">30 Fingers Store</h1>
        </NavLink>
      </div>
      <nav className="header__menu menu">
        <ul className="menu__body">
          <li className="menu__item">
            <NavLink className={setActiveLink} to="/catalog">
              Catalog
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className={setActiveLink} to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header__user user">
        <ul className="user__body">
          <li className="user__item">
            <NavLink className={setActiveLink} to="/login">
              Login
            </NavLink>
          </li>
          <li className="user__item">
            <NavLink className={setActiveLink} to="/registration">
              Registration
            </NavLink>
          </li>
          <li className="user__item">
            <NavLink className={setActiveLink} to="/basket">
              Basket
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
