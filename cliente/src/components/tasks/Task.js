import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
const Task = ({taskItem}) => {
  // Extraer si un proyecto está activo
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  // Obtener la función del context de tarea
  const tasksContext = useContext(taskContext);
  const {deleteTask, getTasks, updateTask, saveCurrentTask} = tasksContext;

  // Extraer el proyecto
  const [currentProject] = project;

  // Elimina una tarea
  const taskDelete = id => {
    deleteTask(id, currentProject._id);
    getTasks(currentProject._id)
  }

  // Función que modifica el estado de las tareas
  const changeState = taskItem => {
    if(taskItem.status){
      taskItem.status = false;
    }else{
      taskItem.status = true;
    }
    updateTask(taskItem);
  }

  // Agrega una tarea actual cuando el usuario desea editarla
  const selectTask = taskItem => {
    saveCurrentTask(taskItem);
  }

  return(
    <li className="tarea sombra">
      <p>{taskItem.name}</p>

      <div className="estado">
        {taskItem.status
        ?
          (<button
              type="button"
              className="completo"
              onClick={() => changeState(taskItem)}

            >Completo</button>)
        :
          (<button
            type="button"
            className="incompleto"
            onClick={() => changeState(taskItem)}

          >Incompleto</button>)
        }
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectTask(taskItem)}
        >Editar</button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => taskDelete(taskItem._id)}
        >Eliminar</button>
      </div>
    </li>
  );
}

export default Task;
