import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {
  // Obtener el state del proyecto
  const projectsContext = useContext(projectContext);
  const { currentProject } = projectsContext;

  // Obtener la función del context de tarea
  const tasksContext = useContext(taskContext);
  const {getTasks} = tasksContext;

  // Función para agregar el proyecto actual
  const selectProject = id => {
    currentProject(id); // Fijar un proyecto actual
    getTasks(id); // Filtrar las tareas cuando se de click
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={ () => selectProject(project._id) }
      >{project.name}</button>
    </li>
  );
}

export default Project;
