import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import Task from './Task';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TaksList = () => {
  // Extraer proyectos de state inicial
  const projectsContext = useContext(projectContext);
  const { project, deleteProject } = projectsContext;

  // Obtener tareas
  const tasksContext = useContext(taskContext);
  const {projecttasks} = tasksContext;

  // Si no hay proyecto seleccionado
  if (!project) return <h2>Selecciona un proyecto</h2>;

  //Array destructuring para extraer el proyecto actual
  const [currentProject] = project;


  // Elimina un proyecto
  const onClickDelete = () => {
    deleteProject(currentProject._id)
  }

  return(
    <Fragment>
      <h2>Proyecto: { currentProject.name }</h2>
      <ul className="listado-tareas">
        {projecttasks.length === 0
          ? (<li className="tarea"><p>No hay tareas</p></li>)
          :
          <TransitionGroup>
            {projecttasks.map(taskItem => (
              <CSSTransition
                key={taskItem._id}
                timeout={200}
                classNames="tarea"
              >
                <Task
                  key={taskItem._id}
                  taskItem={taskItem}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        }
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick = {onClickDelete}
      >Eliminar Proyecto &times;</button>
    </Fragment>
  );
}

export default TaksList;
