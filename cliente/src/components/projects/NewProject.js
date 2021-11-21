import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    // Obtener el state del formulario
    const projectsContext = useContext(projectContext);
    const { form, showForm, formerror, addProject, showError } = projectsContext;

    // State para proyecto
    const[project, saveProject] = useState({
      name:''
    });

    // Extraer nombre de proyecto
    const { name } = project;

    // Lee los contenidos del input
    const onChangeProject = e => {
      saveProject({
        ...project,
        [e.target.name] : e.target.value
      })
    }

    // Cuando el usuario envía un proyectos
    const onSubmitProject = e => {
      e.preventDefault();

      // Validar proyecto
      if(name === ''){
        showError();
        return;
      }
      // Agregar al state
      addProject(project)
      // Reiniciar el form
      saveProject({
        name: ''
      })
    }



  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm()}
      >Nuevo Proyecto</button>

      { form ?
        ( <form
          className="formulario-nuevo-proyecto"
          onSubmit={onSubmitProject}
        >
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="name"
            value={name}
            onChange={onChangeProject}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form> )
        : null }
      { formerror ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null }
    </Fragment>
  );
}

export default NewProject;
