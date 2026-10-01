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
            <p>Desarrollo interfaces de usuario modernas y adaptables a cualquier dispositivo, centradas en la usabilidad, el rendimiento y la accesibilidad. Trabajo con React y TypeScript/ES6+ para crear aplicaciones intuitivas, escalables y fáciles de mantener. Cuento con experiencia en la implementación de sistemas de diseño corporativos, optimización de rendimiento y arquitectura basada en componentes reutilizables.</p>
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
            <p>Desarrollo servicios backend y APIs REST escalables, prestando especial atención a la seguridad, el rendimiento y la calidad del código. Trabajo con PHP (Laravel) y Java para construir aplicaciones fáciles de mantener e integrar. Me enfoco en crear sistemas bien estructurados que permitan incorporar nuevas funcionalidades de forma sencilla.</p>
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
            <p>Diseño y gestiono bases de datos orientadas a un almacenamiento eficiente y una organización clara de la información. Cuento con preparación en el manejo de bases de datos SQL para esquemas relacionales avanzados, así como en soluciones NoSQL (MongoDB) para entornos flexibles. Priorizo la integridad de los datos, la eficiencia en las consultas y la escalabilidad del modelo para soportar el crecimiento del negocio.</p>
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
            <h3>Cloud e Infraestructura</h3>
            <p>Cuento con la certificación AWS Academy Graduate – AWS Academy Cloud Foundations. Trabajo con servicios de AWS y herramientas de virtualización para configurar entornos donde desarrollar, probar y ejecutar aplicaciones. También realizo tareas relacionadas con la preparación de servidores y la gestión básica de infraestructura.</p>
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
            <h3>Docker y Contenerización</h3>
            <p>Trabajo con Docker para crear y gestionar entornos de desarrollo y despliegues. Utilizo la contenerización para simplificar la configuración de aplicaciones, mejorar la reproducibilidad de los proyectos y facilitar su ejecución en diferentes entornos. Esto permite reducir incidencias y mantener flujos de trabajo más predecibles.</p>
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
            <p>Actualmente estoy cursando un Máster en Inteligencia Artificial y Big Data, complementando mi formación en tecnologías de datos e IA. Trabajo con modelos de lenguaje y herramientas de IA generativa para integrar funcionalidades de automatización, búsqueda semántica y procesamiento de información en aplicaciones web.</p>
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