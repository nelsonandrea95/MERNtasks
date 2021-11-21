import React, {useReducer} from 'react';

import projectContext from './projectContext';
import projectReducer from './projectReducer';

import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECTS,
  ERROR_PROJECT,
  FORM_VALIDATION,
  CURRENT_PROJECT,
  DELETE_PROJECT
} from '../../types';

import clientAxios from '../../config/axios';

const ProjectState = props => {


  const initialState = {
    projects : [],
    form : false,
    formerror: false,
    project: null,
    msg:null
  }

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(projectReducer, initialState)

  // Serie de funciones para el CRUD
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT
    })
  }

  // Obtener los proyectos
  const getProjects = async () => {
    try {
      const answer = await clientAxios.get('/api/proyectos');

      dispatch({
        type: GET_PROJECTS,
        payload: answer.data.proyectos
      })
    }  catch (error) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alerta-error'
      }
      dispatch({
        type:ERROR_PROJECT,
        payload: alert
      })
    }
  }

  // Agregar nuevo proyecto
  const addProject = async project => {
    try {
      const answer = await clientAxios.post('/api/proyectos', project);
      console.log(answer);
      //Insertar proyecto en el state
      dispatch({
        type: ADD_PROJECTS,
        payload: answer.data
      })
    }  catch (error) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alerta-error'
      }
      dispatch({
        type:ERROR_PROJECT,
        payload: alert
      })
    }
  }

  // Validad el formulario por errores
  const showError = () => {
    dispatch({
      type: FORM_VALIDATION
    })
  }

  // Selecciona el proyecto que el usuario dio click
  const currentProject = projectId => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId
    })
  }

  // Eliminar proyecto
  const deleteProject = async projectId => {
    try {
      await clientAxios.delete(`/api/proyectos/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId
      })
    } catch (error) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alerta-error'
      }
      dispatch({
        type:ERROR_PROJECT,
        payload: alert
      })
    }
  }

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        formerror: state.formerror,
        project: state.project,
        msg:state.msg,
        showForm,
        getProjects,
        addProject,
        showError,
        currentProject,
        deleteProject
      }}
    >{props.children}</projectContext.Provider>
  )
}
 export default ProjectState;
