import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  LOGOUT
} from '../../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    msg: null,
    charging: true
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Las funciones
  const userRegister = async info => {
    try {
      const answer = await clientAxios.post('/api/usuarios', info);
      console.log(answer);

      dispatch({
        type: SUCCESS_REGISTER,
        payload: answer.data
      });

      // Obtener el usuario
      userAuthenticated();

    } catch (error) {
      //console.log(error.response.data);
      const alert = {
        msg: error.response.data,
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_REGISTER,
        payload: alert
      })
    }
  }

  // Retorna el usuario autenticado
  const userAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if(token) {
      tokenAuth(token);
    }
    try {
      const answer = await clientAxios.get('/api/auth');
      //console.log(answer);
      dispatch({
        type: GET_USER,
        payload: answer.data.usuario
      })
    } catch (error){
      dispatch({
        type: ERROR_LOGIN
      })
    }
  }

  // Cuando el usuario inicia sesión
  const logIn = async info => {
    try {
      const answer = await clientAxios.post('/api/auth', info);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: answer.data
      });
      // Obtener el usuario
      userAuthenticated();

    } catch (error) {
      console.log(error.response.data);
      const alert = {
        msg: error.response.data,
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_LOGIN,
        payload: alert
      })
    }
  }

  // Cierra la sesión del usuario
  const logOut = () => {
    dispatch({
      type: LOGOUT
    })
  }

  return(
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        msg: state.msg,
        charging: state.charging,
        userRegister,
        logIn,
        userAuthenticated,
        logOut
      }}
    >{props.children}
    </AuthContext.Provider>
  )
}
export default AuthState;
