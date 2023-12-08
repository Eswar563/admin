// authActions.js
export const loginSuccess = (jwtToken) => ({
  type: 'LOGIN_SUCCESS',
  payload: jwtToken,
});

export const loginFailure = (errorMsg) => ({
  type: 'LOGIN_FAILURE',
  payload: errorMsg,
});
