import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import avatar from '../assets/images/avatar.png';
import { useTypewriterLoop } from '../hooks/useTypewriterLoop';

const TAGLINES = ["Full Stack Developer", "Especializado en IA y Big Data"];
const TAGLINES_LABEL = `${TAGLINES.join(". ")}.`;
const TYPEWRITER_START_DELAY = 800;

function Main() {
  const { typed, phase } = useTypewriterLoop(TAGLINES, {
    startDelay: TYPEWRITER_START_DELAY,
  });
  const isPaused = phase === "holding" || phase === "between";

  return (
    <div className="container" id="main">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/Vicente-codes" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/vicente-gil-dev/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Vicente Codes</h1>
          <p
            className={`typewriter ${isPaused ? "is-done" : "is-typing"}`}
            aria-label={TAGLINES_LABEL}
          >
            <span className="typewriter__grid" aria-hidden="true">
              {TAGLINES.map((tagline, index) => (
                <span className="typewriter__ghost" key={index}>
                  {tagline}
                </span>
              ))}
              <span className="typewriter__typed">
                {typed}
                <span className="typewriter__cursor" />
              </span>
            </span>
          </p>

          <div className="mobile_social_icons">
            <a href="https://github.com/Vicente-codes" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/vicente-gil-dev/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;