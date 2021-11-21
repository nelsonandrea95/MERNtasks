import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import TopBar from '../layout/TopBar';
import TasksForm from '../tasks/TasksForm';
import TasksList from '../tasks/TasksList';
import AuthContext from '../../context/auth/authContext';

const Projects = () => {

  // Extraer la información de auth
  const authContext = useContext(AuthContext);
  const { userAuthenticated } = authContext;

  useEffect(() => {
    userAuthenticated();
  }, [])

  return(
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <TopBar />
        <main>
          <TasksForm />
          <div className="contenedor-tareas">
            <TasksList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Projects;
