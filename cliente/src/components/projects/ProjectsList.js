import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ProjectsList = () => {

  // Extraer proyectos del state inicial
  const projectsContext = useContext(projectContext);
  const { msg, projects, getProjects } = projectsContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  // Obtner proyectos cuando carga el componente
  useEffect(() => {
    // si hay un error
    if(msg) {
      showAlert(msg.msg, msg.category);
    }

    getProjects();
    //eslint-disable-next-line
  }, [msg]);

  // Revisar si proyecto tiene contenido
  if(projects.length === 0) return <p>No hay proyectos, comienza creando uno</p>;



  return (

    <ul className="listado-proyectos">
      { alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null }
      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition
            key={project._id}
            timeout={200}
            classNames="proyecto">
            <Project
              project={project}
            />
          </CSSTransition>

        ))}
      </TransitionGroup>
    </ul>

  );
}

export default ProjectsList;
