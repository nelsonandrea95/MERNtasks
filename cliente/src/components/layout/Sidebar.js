import React from 'react';
import NewProject from '../projects/NewProject';
import ProjectsList from '../projects/ProjectsList';

const Sidebar = () => {
  return (
    <aside>
      <h1>MERN<span>Tasks</span></h1>
      <NewProject />
      <div className="proyectos">
        <h2>Tus Proyectos</h2>
        <ProjectsList />
      </div>
    </aside>
  );
}

export default Sidebar;
