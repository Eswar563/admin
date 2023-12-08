// authReducer.js
const initialState = {
  jwtToken: null,
  showSubmitError: false,
  errorMsg: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        jwtToken: action.payload,
        showSubmitError: false,
        errorMsg: '',
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        showSubmitError: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
