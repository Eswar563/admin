import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set initial state based on whether the user is logged in or not
  const history = useHistory();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    setIsLoggedIn(false); // Update the state to reflect that the user is not logged in
    history.replace('/login');
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        {isLoggedIn ? (
          <button type="button" className="logout-desktop-btn" onClick={onClickLogout}>
            Logout
          </button>
        ) : (
          // You can add login or other navigation links here
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
