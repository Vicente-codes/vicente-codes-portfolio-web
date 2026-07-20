import React from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Proyectos Personales</h1>
        <div className="projects-grid">
            {projects.map((project) => (
                <div className="project" key={project.slug}>
                    <Link to={`/proyectos/${project.slug}`}>
                        <img src={project.thumbnail} className="zoom" alt={`Miniatura de ${project.title}`} width="100%"/>
                    </Link>
                    <Link to={`/proyectos/${project.slug}`}><h2>{project.title}</h2></Link>
                    <p>{project.shortDescription}</p>
                </div>
            ))}
        </div>
    </div>
    );
}

export default Project;

