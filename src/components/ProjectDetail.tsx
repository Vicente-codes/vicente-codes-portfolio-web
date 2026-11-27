import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Chip from "@mui/material/Chip";
import { getProjectBySlug } from "../data/projects";
import "../assets/styles/ProjectDetail.scss";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type RichTextBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}

interface RichTextProps {
  text: string;
  className?: string;
}

const BULLET_PATTERN = /^\s*(?:🔹|•|·|-)\s*/;

/**
 * Turns the plain text stored in projects.ts into readable paragraphs and
 * lists. The data uses blank lines for paragraphs and "🔹" for list items.
 */
function parseRichText(rawText: string): RichTextBlock[] {
  const normalized = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

  if (!normalized) {
    return [];
  }

  const blocks: RichTextBlock[] = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    const text = paragraphLines.join(" ").replace(/\s+/g, " ").trim();

    if (text) {
      blocks.push({ type: "paragraph", text });
    }

    paragraphLines = [];
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
    }

    listItems = [];
  };

  normalized.split("\n").forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (BULLET_PATTERN.test(line)) {
      flushParagraph();
      listItems.push(line.replace(BULLET_PATTERN, "").trim());
      return;
    }

    flushList();
    paragraphLines.push(line);
  });

  flushParagraph();
  flushList();

  // Merge lists that were separated by blank lines between their items.
  return blocks.reduce<RichTextBlock[]>((mergedBlocks, block) => {
    const previousBlock = mergedBlocks[mergedBlocks.length - 1];

    if (block.type === "list" && previousBlock?.type === "list") {
      previousBlock.items.push(...block.items);
      return mergedBlocks;
    }

    mergedBlocks.push(block);
    return mergedBlocks;
  }, []);
}

function RichText({ text, className }: RichTextProps) {
  const blocks = useMemo(() => parseRichText(text), [text]);
  const classes = ["project-detail-rich-text", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {blocks.map((block, index) =>
        block.type === "list" ? (
          <ul key={`list-${index}`}>
            {block.items.map((item, itemIndex) => (
              <li key={`item-${index}-${itemIndex}`}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={`paragraph-${index}`}>{block.text}</p>
        ),
      )}
    </div>
  );
}

function stripChallengeNumber(title: string): string {
  return title.replace(/^\s*\d+\.\s*/, "");
}

function getChallengeDisplayTitle(title: string, position: number) {
  return {
    index: String(position + 1).padStart(2, "0"),
    title: stripChallengeNumber(title),
  };
}

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  // Image currently open in the lightbox (null = closed).
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // State to track if the video is currently playing.
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  const isLightboxOpen = lightboxIndex !== null;

  /**
   * Flat gallery: the hero image first, followed by every challenge image.
   * This lets the lightbox move through all screenshots of the project.
   */
  const gallery = useMemo<LightboxImage[]>(() => {
    if (!project) {
      return [];
    }

    const images: LightboxImage[] = [];

    if (project.heroImage) {
      images.push({
        src: project.heroImage,
        alt: `Captura principal de ${project.title}`,
        caption: "Vista general del proyecto",
      });
    }

    project.challenges.forEach((challenge) => {
      challenge.images?.forEach((image, index) => {
        images.push({
          src: image,
          alt: `${stripChallengeNumber(challenge.title)} - imagen ${index + 1}`,
          caption: stripChallengeNumber(challenge.title),
        });
      });
    });

    return images;
  }, [project]);

  const currentLightboxImage =
    lightboxIndex !== null ? gallery[lightboxIndex] : undefined;

  const openLightbox = (index: number) => {
    if (index >= 0 && index < gallery.length) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);

  const showPreviousImage = () => {
    setLightboxIndex((index) => {
      if (index === null || gallery.length === 0) {
        return index;
      }

      return (index - 1 + gallery.length) % gallery.length;
    });
  };

  const showNextImage = () => {
    setLightboxIndex((index) => {
      if (index === null || gallery.length === 0) {
        return index;
      }

      return (index + 1) % gallery.length;
    });
  };

  useEffect(() => {
    // Reset media state when navigating between projects.
    setIsVideoPlaying(false);
    setLightboxIndex(null);

    if (project) {
      document.title = `${project.title} | Vicente Codes`;
    }
  }, [project]);

  // Keyboard navigation, scroll lock and focus management for the lightbox.
  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightboxIndex((index) => {
          if (index === null || gallery.length === 0) {
            return index;
          }

          return (index - 1 + gallery.length) % gallery.length;
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setLightboxIndex((index) => {
          if (index === null || gallery.length === 0) {
            return index;
          }

          return (index + 1) % gallery.length;
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while the lightbox is open.
    document.body.style.overflow = "hidden";
    lightboxCloseRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocusedElement?.focus?.();
    };
  }, [gallery.length, isLightboxOpen]);

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
        <h1 className="project-detail-header__title">{project.title}</h1>

        {project.dates && (
          <p className="project-detail-dates">{project.dates}</p>
        )}

        <p className="project-detail-header__subtitle">{project.subtitle}</p>

        {project.liveUrl && (
          <div className="project-detail-live">
            <Button
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="live-button"
              variant="contained"
              size="large"
              endIcon={<OpenInNewIcon />}
              aria-label={`Visitar la web de ${project.title} (se abre en una pestaña nueva)`}
            >
              Visitar la web
            </Button>
          </div>
        )}

        <div className="project-detail-stack">
          <span className="project-detail-stack__label">
            Stack tecnológico
          </span>

          <div className="project-detail-stack__chips">
            {project.stack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                className="project-detail-chip"
              />
            ))}
          </div>
        </div>
      </header>

      <div className="project-detail-media">
        {project.video ? (
          <figure className="project-detail-video-section">
            <div
              className={`project-detail-video-wrapper${
                isVideoPlaying ? " is-playing" : ""
              }`}
            >
              <video
                ref={videoRef}
                className="project-detail-video"
                controls={isVideoPlaying}
                playsInline
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
                <div className="project-detail-video-overlay">
                  <button
                    type="button"
                    className="project-detail-video-play-button"
                    aria-label={`Reproducir recorrido de ${project.title}`}
                    onClick={() => {
                      videoRef.current?.play().catch(() => undefined);
                    }}
                  >
                    <PlayArrowIcon aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            <figcaption className="project-detail-media-caption">
              Recorrido visual del proyecto
            </figcaption>
          </figure>
        ) : (
          project.heroImage && (
            <figure className="project-detail-hero">
              <button
                type="button"
                className="project-detail-media-button"
                aria-label={`Ampliar vista general de ${project.title}`}
                onClick={() => openLightbox(0)}
              >
                <img
                  src={project.heroImage}
                  alt={`Captura principal de ${project.title}`}
                  loading="eager"
                  decoding="async"
                />

                <span className="project-detail-media-hint" aria-hidden="true">
                  <ZoomInIcon />
                  Ampliar
                </span>
              </button>

              <figcaption className="project-detail-media-caption">
                Vista general del proyecto
              </figcaption>
            </figure>
          )
        )}
      </div>

      <section
        className="project-detail-section project-detail-overview"
        aria-labelledby="project-overview-title"
      >
        <h2
          className="project-detail-section__title"
          id="project-overview-title"
        >
          Sobre el proyecto
        </h2>

        <RichText text={project.fullDescription} />
      </section>

      {project.role && (
        <section
          className="project-detail-section project-detail-role"
          aria-labelledby="project-role-title"
        >
          <h2 className="project-detail-section__title" id="project-role-title">
            Rol y responsabilidades
          </h2>

          <RichText text={project.role} />
        </section>
      )}

      {project.challenges.length > 0 && (
        <section
          className="project-detail-section project-detail-challenges"
          aria-labelledby="project-challenges-title"
        >
          <div className="project-detail-challenges__heading">
            <h2
              className="project-detail-section__title"
              id="project-challenges-title"
            >
              Retos técnicos resueltos
            </h2>

            <span className="project-detail-challenges__count">
              {project.challenges.length} retos
            </span>
          </div>

          <div className="project-detail-challenges__list">
            {project.challenges.map((challenge, position) => {
              const displayTitle = getChallengeDisplayTitle(
                challenge.title,
                position,
              );

              return (
                <article
                  className="project-detail-challenge"
                  key={challenge.title}
                >
                  <div className="project-detail-challenge__header">
                    <span
                      className="project-detail-challenge__index"
                      aria-hidden="true"
                    >
                      {displayTitle.index}
                    </span>

                    <h3 className="project-detail-challenge__title">
                      {displayTitle.title}
                    </h3>
                  </div>

                  <RichText text={challenge.description} />

                  {challenge.images && challenge.images.length > 0 && (
                    <div
                      className={`project-detail-challenge__gallery ${
                        challenge.images.length === 1 ? "is-single" : "is-grid"
                      }`}
                    >
                      {challenge.images.map((image, imageIndex) => {
                        const imageAlt = `${
                          displayTitle.title
                        } - imagen ${imageIndex + 1}`;

                        return (
                          <button
                            key={`${image}-${imageIndex}`}
                            type="button"
                            className="project-detail-gallery-item"
                            aria-label={`Ampliar ${imageAlt}`}
                            onClick={() => {
                              const galleryIndex = gallery.findIndex(
                                (item) =>
                                  item.src === image && item.alt === imageAlt,
                              );

                              openLightbox(galleryIndex);
                            }}
                          >
                            <img
                              src={image}
                              alt={imageAlt}
                              loading="lazy"
                              decoding="async"
                            />

                            <span
                              className="project-detail-gallery-item__overlay"
                              aria-hidden="true"
                            >
                              <ZoomInIcon />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {project.result && (
        <section
          className="project-detail-section project-detail-result"
          aria-labelledby="project-result-title"
        >
          <h2
            className="project-detail-section__title"
            id="project-result-title"
          >
            Resultado
          </h2>

          <RichText text={project.result} />
        </section>
      )}

      {project.collaborators && (
        <section
          className="project-detail-section project-detail-collaborators"
          aria-labelledby="project-collaborators-title"
        >
          <h2
            className="project-detail-section__title"
            id="project-collaborators-title"
          >
            Colaboradores
          </h2>

          <RichText text={project.collaborators} />
        </section>
      )}

      {project.repoUrl && (
        <div className="project-detail-actions">
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
        </div>
      )}

      {currentLightboxImage && (
        <div
          className="project-detail-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes del proyecto"
          onClick={closeLightbox}
        >
          <button
            ref={lightboxCloseRef}
            type="button"
            className="project-detail-lightbox__close"
            aria-label="Cerrar galería"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
          >
            <CloseIcon aria-hidden="true" />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                className="project-detail-lightbox__nav project-detail-lightbox__nav--prev"
                aria-label="Imagen anterior"
                onClick={(event) => {
                  event.stopPropagation();
                  showPreviousImage();
                }}
              >
                <ChevronLeftIcon aria-hidden="true" />
              </button>

              <button
                type="button"
                className="project-detail-lightbox__nav project-detail-lightbox__nav--next"
                aria-label="Imagen siguiente"
                onClick={(event) => {
                  event.stopPropagation();
                  showNextImage();
                }}
              >
                <ChevronRightIcon aria-hidden="true" />
              </button>
            </>
          )}

          <figure
            className="project-detail-lightbox__figure"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={currentLightboxImage.src}
              alt={currentLightboxImage.alt}
              className="project-detail-lightbox__image"
            />

            <figcaption className="project-detail-lightbox__caption">
              <span>{currentLightboxImage.caption}</span>

              {gallery.length > 1 && (
                <span className="project-detail-lightbox__counter">
                  {lightboxIndex! + 1} / {gallery.length}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
