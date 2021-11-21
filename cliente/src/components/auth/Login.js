import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

  // extraer los valores del context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { msg, authenticated ,logIn } = authContext;

  // En caso de que el usuario no exista
  useEffect(() => {
    if(authenticated) {
      props.history.push('/projects');
    }
    if(msg) {
      showAlert(msg.msg.msg, msg.category);
    }
  }, [msg, authenticated, props.history]);

  // State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    email:'',
    password:''
  });

  // extraer de usuario
  const { email, password } = usuario;

  const onChange = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name] : e.target.value
    })
  }

  // Cuando el usuario quiere inciar sesión
  const onSubmit = e => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if(email.trim() === '' || password.trim() === ''){
      showAlert('Todos los campos son obligatorios', 'alerta-error');
    }

    // Pasarlo al action
    logIn({email, password});
  }

  return(
    <div className="form-usuario">
      { alert ? (<div className={`alert ${alert.categoria}`}>{alert.msg}</div>) : null }
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form
          onSubmit={onSubmit}
        >
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión" />
          </div>
        </form>
        <Link
          to={'/new-account'}
          className="enlace-cuenta"
        >
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
}

export default Login;
