import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import Chip from '@mui/material/Chip';
import { getProjectBySlug } from "../data/projects";
import '../assets/styles/ProjectDetail.scss';

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Vicente Codes`;
    }
  }, [project]);

  //If the slug does not correspond to any known project, we return to the home page.
  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="project-detail-container" id="project-detail">
      <div className="items-container">
        <Link to="/#projects" className="back-link">← Volver a proyectos</Link>

        <h1>{project.title}</h1>
        <h2 className="project-detail-subtitle">{project.subtitle}</h2>

        <div className="project-detail-stack">
          {project.stack.map((tech) => (
            <Chip key={tech} className="chip" label={tech} />
          ))}
        </div>

        <p className="project-detail-description">{project.fullDescription}</p>

        {project.images.length > 0 && (
          <img
            src={project.images[0]}
            alt={`Captura principal de ${project.title}`}
            className="project-detail-hero-image"
          />
        )}

        <div className="project-detail-sections">
          {project.challenges.map((challenge) => (
            <section className="project-detail-section" key={challenge.title}>
              <h3 className="project-detail-section-title">{challenge.title}</h3>
              <p className="project-detail-section-text">{challenge.description}</p>

              {challenge.images && challenge.images.length > 0 && (
                <div
                  className={`project-detail-section-images ${
                    challenge.images.length > 1 ? "grid" : "single"
                  }`}
                >
                  {challenge.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${challenge.title} - imagen ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </section>
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
