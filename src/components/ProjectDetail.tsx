import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import Chip from '@mui/material/Chip';
import { getProjectBySlug } from "../data/projects";
import '../assets/styles/ProjectDetail.scss';

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Vicente Codes`;
    }
  }, [project]);

  // Si el slug no corresponde a ningún proyecto conocido, volvemos a la home.
  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="project-detail-container" id="project-detail">
      <div className="items-container">
        <Link to="/#projects" className="back-link">← Volver a proyectos</Link>

        <h1>{project.title}</h1>
        <h2 className="project-detail-subtitle">{project.subtitle}</h2>

        <div className="project-detail-gallery">
          <img
            src={project.images[activeImage]}
            alt={`Captura de ${project.title}`}
            className="project-detail-gallery-main"
          />
          {project.images.length > 1 && (
            <div className="project-detail-gallery-thumbnails">
              {project.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Miniatura ${index + 1} de ${project.title}`}
                  className={index === activeImage ? "active" : ""}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="project-detail-stack">
          {project.stack.map((tech) => (
            <Chip key={tech} className="chip" label={tech} />
          ))}
        </div>

        <p className="project-detail-description">{project.fullDescription}</p>

        <div className="project-detail-challenges">
          <h3>Retos técnicos</h3>
          {project.challenges.map((challenge) => (
            <div className="challenge" key={challenge.title}>
              <h4>{challenge.title}</h4>
              <p>{challenge.description}</p>
            </div>
          ))}
        </div>

        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="project-detail-repo-link"
        >
          <GitHubIcon /> Ver código en GitHub
        </a>
      </div>
    </div>
  );
}

export default ProjectDetail;