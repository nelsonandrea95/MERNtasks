import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import clientAxios from '../../config/axios';

import{
  PROJECT_TASKS,
  ADD_TASK,
  TASK_VALIDATION,
  DELETE_TASK,
  TASK_STATE,
  CURRENT_TASK,
  UPDATE_TASK,
  CLEAN_TASK
} from '../../types';

const TaskState = props => {
  const initialState = {
    task: null,
    projecttasks: [],
    taskerror: false,
    taskselected: null
  }

  // Crear dispatch y state
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // Crear las funciones

  // Obtener las tareas de un proyecto
  const getTasks = async project => {
    const answer = await clientAxios.get('/api/tareas',{params : {projectId : project}});
    console.log(answer);
    try {
      dispatch({
        type: PROJECT_TASKS,
        payload: answer.data.task
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Agregar una tarea al proyecto seleccionado
  const addTask = async task => {
    try {
      const answer = await clientAxios.post('/api/tareas', task);
      console.log(answer)
      dispatch({
        type: ADD_TASK,
        payload: answer.data.task
      })
    } catch (error) {
      console.log(task);
    }
  }

  // Valida y muestra un error en caso de que se necesario
  const taskValidation = () => {
    dispatch({
      type: TASK_VALIDATION
    })
  }

  // Eliminar tarea por id
  const deleteTask = async (id, project) => {
    try {
      await clientAxios.delete(`/api/tareas/${id}`, {params : {projectId : project}});
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Edita o modifica una tarea
  const updateTask = async task => {
    try {
      const answer = await clientAxios.put(`/api/tareas/${task._id}`,task);
      console.log(answer);
      dispatch({
        type: UPDATE_TASK,
        payload: answer.data
      })
    } catch (error) {
      console.log(task);
    }
  }

  // Extrae una tarea para edición
  const saveCurrentTask = task => (
    dispatch({
      type: CURRENT_TASK,
      payload: task
    })
  )



  // Elimina la tarea seleccionada
  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK
    })
  }

  return (
    <TaskContext.Provider
      value={{
        task: state.task,
        projecttasks: state.projecttasks,
        taskerror: state.taskerror,
        taskselected: state.taskselected,
        getTasks,
        addTask,
        taskValidation,
        deleteTask,
        saveCurrentTask,
        updateTask,
        cleanTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState;
