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
  "TypeScript",
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
  "IA generativa",
  "LLMs",
  "Big Data",
  "Ollama",
  "Python",
  "Machine Learning",
  "Deep Learning",
  "Modelos predictivos",
  "Análisis de datos"
];

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Tecnologías</h1>
        <div className="skills-grid">
          
          {/* 1. FRONT-END */}
          <div className="skill">
            <FontAwesomeIcon icon={faReact} size="3x"className="icon-react"/>
            <h3>Desarrollo Front-end</h3>
            <p>Desarrollo interfaces de usuario modernas y adaptables a cualquier dispositivo, ofreciendo experiencias fluidas, accesibles y mantenibles, aplicando las mejores prácticas de desarrollo con React y TypeScript/ES6+. Cuento con experiencia en la implementación de sistemas de diseño corporativos, optimización de rendimiento y arquitectura basada en componentes reutilizables.</p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFrontend.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          {/* 2. BACK-END */}
          <div className="skill">
            <FontAwesomeIcon icon={faLaravel} size="3x" className="icon-laravel"/>
            <h3>Arquitectura Back-end</h3>
            <p>Diseño e implemento arquitecturas de servidor robustas y APIs REST escalables. Cuento con formación especializada y proyectos desarrollados en la construcción de servicios seguros y de alto rendimiento utilizando Laravel (PHP) y Spring Boot (Java), garantizando integraciones fiables, código mantenible y escalabilidad en entornos de producción.</p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsBackend.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          {/* 3. BASES DE DATOS */}
          <div className="skill">
            <FontAwesomeIcon icon={faDatabase} size="3x" className="icon-database"/>
            <h3>Gestión de Bases de Datos</h3>
            <p>Desarrollo sistemas de datos bien estructurados y optimizados. Cuento con preparación práctica en el manejo de bases de datos SQL para esquemas relacionales avanzados, así como en soluciones NoSQL (MongoDB) para entornos flexibles. Priorizo la integridad de los datos, la eficiencia en las consultas y la escalabilidad del modelo para soportar el crecimiento del negocio.</p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsDatabases.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          {/* 4. AWS */}
          <div className="skill">
            <FontAwesomeIcon icon={faAws} size="3x" className="icon-aws"/>
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
            <FontAwesomeIcon icon={faDocker} size="3x" className="icon-docker"/>
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
            <FontAwesomeIcon icon={faBrain} size="3x" className="icon-brain"/>
            <h3>Integración de IA y LLMs</h3>
            <p>Integro modelos de lenguaje (LLMs) y servicios de IA generativa en el ecosistema web. Domino el despliegue local de IAs para entornos de desarrollo y la implementación de sistemas de búsqueda semántica, automatización y flujos de trabajo inteligentes.</p>
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