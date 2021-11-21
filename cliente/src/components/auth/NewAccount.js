import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const NewAccount = (props) => {

  // extraer los valores del context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { msg, authenticated ,userRegister } = authContext;

  // En caso de que el usuario se haya autenticado o registrado o se un registro duplicado
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
    name:'',
    email:'',
    password:'',
    verifyPassword:''
  });

  // extraer de usuario
  const { name, email, password, verifyPassword } = usuario;

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
    if( name.trim() === '' ||
        email.trim() === '' ||
        password.trim() === '' ||
        verifyPassword.trim() === ''){
          showAlert('Todos los campos son obligatorios', 'alerta-error');
          return;
        }
    // Password minimo 6 caracteres
    if(password.length < 6){
      showAlert('El password debe ser de la menos 6 caracteres', 'alerta-error');
    }
    // Los dos password son iguales
    if(password !== verifyPassword){
      showAlert('Los password no son iguales', 'alerta-error');
    }

    // Pasarlo al action
    userRegister({
      name,
      email,
      password
    })
  }

  return(
    <div className="form-usuario">
      { alert ? (<div className={`alert ${alert.categoria}`}>{alert.msg}</div>) : null }
      <div className="contenedor-form sombra-dark">
        <h1>Crear cuenta</h1>
        <form
          onSubmit={onSubmit}
        >
        <div className="campo-form">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tu Nombre"
            value={name}
            onChange={onChange}
          />
        </div>

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
            <label htmlFor="verifyPassword">Confirmar Password</label>
            <input
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              placeholder="Tu Password"
              value={verifyPassword}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Enviar" />
          </div>
        </form>
        <Link
          to={'/'}
          className="enlace-cuenta"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}

export default NewAccount;
