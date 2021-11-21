import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  LOGOUT } from '../../types';

export default (state, action) => {
  switch(action.type) {
    case SUCCESS_REGISTER:
    case SUCCESS_LOGIN:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        authenticated: true,
        msg: null,
        charging: false
      }
    case GET_USER:
        return {
          ...state,
          authenticated: true,
          user: action.payload,
          charging: false
        }
    case ERROR_LOGIN:
    case ERROR_REGISTER:
    case LOGOUT:
        localStorage.removeItem('token');
        return{
          ...state,
          token: null,
          authenticated: null,
          user:null,
          msg: action.payload,
          charging: false
        }
    default:
      return state;
  }
}
