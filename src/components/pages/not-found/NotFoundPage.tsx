import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__body">
        Go{' '}
        <NavLink className="not-found__link" to="/">
          Main Page
        </NavLink>
      </p>
    </div>
  );
};

export default NotFoundPage;
