import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Brand icons import
import { 
  faReact, 
  faDocker, 
  faAws, 
  faLaravel 
} from '@fortawesome/free-brands-svg-icons'; 
// Solid icons import (Fixed: faDatabase and faBrain are now imported from the correct package)
import { 
  faDatabase, 
  faBrain 
} from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

// 1. FRONTEND LABELS
const labelsFrontend = [
  "React",
  "JavaScript (ES6+)",
  "HTML5",
  "CSS3",
  "SASS",
  "Diseño Responsivo",
  "Integración de APIs"
];

// 2. BACKEND LABELS
const labelsBackend = [
  "PHP",
  "Laravel",
  "Java",
  "Spring Boot",
  "REST APIs",
  "Arquitectura MVC",
  "JUnit"
];

// 3. DATABASES LABELS
const labelsDatabases = [
  "SQL",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Diseño de Bases de Datos",
  "Optimización de Consultas"
];

// 4. AWS LABELS
const labelsAws = [
  "AWS",
  "EC2",
  "S3",
  "Seguridad Cloud",
  "VirtualBox",
  "Virtualización"
];

// 5. DOCKER LABELS
const labelsDocker = [
  "Docker",
  "Docker Compose",
  "Contenedores",
  "Bases de CI/CD",
  "Git",
  "GitHub"
];

// 6. AI & LLM LABELS
const labelsAi = [
  "OpenAI API",
  "LangChain",
  "Ingeniería de Prompts",
  "Bases de Datos Vectoriales",
  "Hugging Face",
  "Integración de IA"
];

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Tecnologías</h1>
        <div className="skills-grid">
          
          {/* 1. FRONT-END */}
          <div className="skill">
            <FontAwesomeIcon icon={faReact} size="3x"/>
            <h3>Desarrollo Front-end</h3>
            <p>Construyo interfaces de usuario dinámicas, adaptables y altamente interactivas desde cero. Mi enfoque se centra en crear experiencias de usuario fluidas, diseños modernos y escribir código limpio y mantenible basado en componentes utilizando React y ES6+.</p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFrontend.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          {/* 2. BACK-END */}
          <div className="skill">
            <FontAwesomeIcon icon={faLaravel} size="3x"/>
            <h3>Arquitectura Back-end</h3>
            <p>Diseño e implemento lógica de servidor robusta y APIs de negocio escalables. Cuento con experiencia en el desarrollo de entornos backend seguros utilizando Laravel (PHP) y Spring Boot (Java), garantizando un alto rendimiento e integraciones fiables.</p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsBackend.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          {/* 3. BASES DE DATOS */}
          <div className="skill">
            <FontAwesomeIcon icon={faDatabase} size="3x"/>
            <h3>Gestión de Bases de Datos</h3>
            <p>Especialista en estructurar, modelar y optimizar sistemas de datos. Trabajo con fluidez tanto en bases de datos SQL para restricciones relacionales complejas, como en soluciones NoSQL como MongoDB para manejar flujos de datos rápidos y flexibles.</p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsDatabases.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          {/* 4. AWS */}
          <div className="skill">
            <FontAwesomeIcon icon={faAws} size="3x"/>
            <h3>Infraestructura Cloud</h3>
            <p>Administro el despliegue de aplicaciones utilizando servicios esenciales en la nube. Mi experiencia abarca la configuración de entornos de alojamiento en AWS, la preparación de servidores virtuales seguros y la gestión de infraestructura de virtualización local con VirtualBox.</p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsAws.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          {/* 5. DOCKER */}
          <div className="skill">
            <FontAwesomeIcon icon={faDocker} size="3x"/>
            <h3>Contenedores y DevOps</h3>
            <p>Optimizo los flujos de trabajo desde la fase de desarrollo hasta producción mediante la contenerización. Al estructurar y orquestar entornos con Docker, elimino el clásico problema de "en mi máquina sí funciona" y aseguro despliegues consistentes y predecibles.</p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsDocker.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          {/* 6. IA Y LLM */}
          <div className="skill">
            <FontAwesomeIcon icon={faBrain} size="3x"/>
            <h3>Integración de IA y LLMs</h3>
            <p>Aporto inteligencia moderna a las aplicaciones web integrando modelos de lenguaje de última generación (LLMs) y APIs de IA generativa. Me enfoco en desarrollar funciones de automatización inteligente, flujos de prompts y sistemas de búsqueda semántica.</p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsAi.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Expertise;