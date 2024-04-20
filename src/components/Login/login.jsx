import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../../redux/actions/actions.js';

const LoginForm = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.jwtToken);
  const history = useHistory();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken) => {
    console.log(jwtToken, '<<<<<<<<<<<<<<<<<<<<<<<<<')
    dispatch(loginSuccess(jwtToken));
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    });
    history.replace('/')
  };

  const onSubmitFailure = (errorMsg) => {
    console.log(errorMsg);
    dispatch(loginFailure(errorMsg));
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { email, password };
    const url = 'http://localhost:4000/login';

    try {
      const response = await axios.post(url, userDetails);
      console.log('response>>>>>>>>>>', response.data);

      if (response.status === 200) {
        onSubmitSuccess(response.data.jwtToken);
        console.log('hjkwer', response.data.jwtToken)
      } else {
        onSubmitFailure(response.data.error_msg);
      }
    } catch (error) {
      console.error('Error during API call', error);
    }
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={onChangePassword}
      />
    </>
  );

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="email"
        id="username"
        className="username-input-field"
        value={email}
        onChange={onChangeUsername}
      />
    </>
  );

  // if (jwtToken) {
  //   console.log(jwtToken, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<NNNNNNNNNNNNNNN')
  //   return <Redirect to="/" />;
  // }

  return (
    <>
    {Cookies.get('jwt_token') !== undefined && <Redirect to="/" />}
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
    </>
  );
};

export default LoginForm;
