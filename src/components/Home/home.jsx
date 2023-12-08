import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header/header';

const Home = () => {
  const [jwtToken, setJwtToken] = useState(Cookies.get('jwt_token'));
  const history = useHistory();

  useEffect(() => {
    console.log(jwtToken, 'undefined');
    if (jwtToken === undefined) {
      history.push('/login');
    }
  }, [jwtToken, history]);

  return (
    <>
      <Header />
      <div className="home-container">
        <h1>home</h1>
      </div>
    </>
  );
};

export default Home;
