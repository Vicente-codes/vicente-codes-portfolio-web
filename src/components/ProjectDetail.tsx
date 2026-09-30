import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import Chip from "@mui/material/Chip";
import { getProjectBySlug } from "../data/projects";
import "../assets/styles/ProjectDetail.scss";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  // Image currently open in the lightbox (null = closed)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // State to track if the video is currently playing
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    // Reset the video state when navigating between projects.
    setIsVideoPlaying(false);

    if (project) {
      document.title = `${project.title} | Vicente Codes`;
    }
  }, [project]);

  // Close the lightbox with the Escape key.
  useEffect(() => {
    if (!lightboxSrc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxSrc(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while the lightbox is open.
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxSrc]);

  // If the slug does not correspond to any known project, return to the home page.
  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="project-detail-container">
      <Button
        component={Link}
        to="/#projects"
        className="back-button"
        variant="contained"
        startIcon={<ArrowBackIcon />}
      >
        Volver a proyectos
      </Button>

      <header className="project-detail-header">
        <h1>{project.title}</h1>

        {project.dates && (
          <p className="project-detail-dates">{project.dates}</p>
        )}

        <p className="project-detail-subtitle">{project.subtitle}</p>

        <div className="project-detail-stack">
          {project.stack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              color="primary"
            />
          ))}
        </div>
      </header>

      {project.video ? (
        <section className="project-detail-video-section">
          <div className="project-detail-video-wrapper">
            <video
              className="project-detail-video"
              controls
              preload="none"
              poster={project.heroImage}
              aria-label={`Recorrido visual por ${project.title}`}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src={project.video} type="video/mp4" />
              Tu navegador no puede reproducir este vídeo.
            </video>

            {!isVideoPlaying && (
              <button
                type="button"
                className="project-detail-video-play-button"
                aria-label={`Reproducir recorrido de ${project.title}`}
                onClick={(event) => {
                  const video = event.currentTarget
                    .previousElementSibling as HTMLVideoElement | null;

                  video?.play();
                }}
              >
                <PlayArrowIcon aria-hidden="true" />
              </button>
            )}
          </div>
        </section>
      ) : (
        project.heroImage && (
          <img
            src={project.heroImage}
            alt={`Captura principal de ${project.title}`}
            className="project-detail-hero-image project-detail-zoomable"
            onClick={() => setLightboxSrc(project.heroImage)}
          />
        )
      )}

      <p className="project-detail-description">
        {project.fullDescription}
      </p>

      {project.role && (
        <section className="project-detail-role">
          <h3 className="project-detail-section-subtitle">
            Rol y responsabilidades:
          </h3>

          <p className="project-detail-section-text">
            {project.role}
          </p>
        </section>
      )}

      {project.challenges.length > 0 && (
        <section className="project-detail-challenges">
          <h2 className="project-detail-section-title">
            Retos técnicos resueltos
          </h2>

          <div className="project-detail-sections">
            {project.challenges.map((challenge) => (
              <div
                className="project-detail-section"
                key={challenge.title}
              >
                <h3 className="project-detail-section-subtitle">
                  {challenge.title}
                </h3>

                <p className="project-detail-section-text">
                  {challenge.description}
                </p>

                {challenge.images && challenge.images.length > 0 && (
                  <div
                    className={`project-detail-section-images ${
                      challenge.images.length === 1
                        ? "single"
                        : "grid"
                    }`}
                  >
                    {challenge.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${challenge.title} - imagen ${index + 1}`}
                        className="project-detail-zoomable"
                        onClick={() => setLightboxSrc(image)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {project.result && (
        <section className="project-detail-result">
          <h2 className="project-detail-section-title">
            Resultado
          </h2>

          <p className="project-detail-section-text">
            {project.result}
          </p>
        </section>
      )}

      {project.collaborators && (
        <section className="project-detail-collaborators">
          <h2 className="project-detail-section-title">
            Colaboradores
          </h2>

          <p className="project-detail-section-text">
            {project.collaborators}
          </p>
        </section>
      )}

      {project.repoUrl && (
        <Button
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-button"
          variant="contained"
          startIcon={<GitHubIcon />}
        >
          Ver repositorio
        </Button>
      )}

      {lightboxSrc && (
        <div
          className="project-detail-lightbox-overlay"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt="Imagen ampliada"
            className="project-detail-lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;