import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TasksForm = () => {
  // Extraer si un proyecto está activo
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  // Obtener la función del context de tarea
  const tasksContext = useContext(taskContext);
  const {taskselected, addTask, taskerror, taskValidation, getTasks, updateTask, cleanTask} = tasksContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect (() => {
    if(taskselected !== null) {
      saveTask(taskselected)
    }else{
      saveTask({
        name:''
      })
    }
  },[taskselected]);

  // State del formulario
  const [task , saveTask] = useState ({
    name: ''
  })

  // extraer el nombre del proyecto
  const { name } = task;

  // Si no hay proyecto seleccionado
  if (!project) return null;

  //Array destructuring para extraer el proyecto actual
  const [currentProject] = project;

  // Leer los valores del formulario
  const handleChange = e => {
    saveTask({
      ...task,
      [e.target.name] : e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();

    // Validar
    if(name.trim() === ''){
      taskValidation();
      return;
    }

    // Si es edición o si es nueva tarea
    if(taskselected === null){
      // Agregar la nueva tarea al state de tareas
      task.projectId = currentProject._id;
      addTask(task);
    }else{
      // Actualizar tarea existente
      updateTask(task);

      // Elimina tarea seleccionada del state
      cleanTask();
    }
    // Pasar la validación



    // Obtener y filtrar las tareas del proyecto actual
    getTasks(currentProject.id);

    // Reiniciar el form
    saveTask({
      name: ''
    })
  }

  return(
    <div className="formulario">
      <form
        onSubmit={onSubmit}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={taskselected ? "Editar tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      { taskerror ? <p className="mensaje error">Debe ingresar el nombre de la tarea</p> : null }
    </div>
  );
}

export default TasksForm;
