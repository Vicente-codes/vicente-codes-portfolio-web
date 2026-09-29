import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Brand icons import
import { 
  faReact, 
  faSistrix, 
  faWordpressSimple,
} from '@fortawesome/free-brands-svg-icons'; 
// Solid icons import (Fixed: faDatabase and faBrain are now imported from the correct package)
import { faMicrochip, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Experiencia</h1>
        <VerticalTimeline>
          
          {/* 1. Frontend Developer */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            dateClassName="timeline-date-highlight"
            date="2026"
            iconStyle={{ background: '#2ec5ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faReact} />}
          >
            <h3 className="vertical-timeline-element-title">Frontend Developer (React & JS)</h3>
            <h4 className="vertical-timeline-element-subtitle">Consultora Tecnológica (Proyecto Banca)</h4>
            <p>
              Desarrollo y optimización de plataformas web para el ecosistema financiero (App banca electrónica y herramientas B2E). 
              Implementación del Design System corporativo, integración de APIs REST, refactorización de código legacy y aseguramiento de la calidad mediante pruebas unitarias (Jest) bajo metodología Scrum.
            </p>
          </VerticalTimelineElement>

          {/* 2. Responsable de Operaciones */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            dateClassName="timeline-date-highlight"
            date="2013 - 2025"
            iconStyle={{ background: '#2ec5ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faMicrochip} />}
          >
            <h3 className="vertical-timeline-element-title">Responsable de Operaciones, Calidad y Procesos</h3>
            <h4 className="vertical-timeline-element-subtitle">Sector Industrial (Artes Gráficas)</h4>
            <p>
              Dirección integral de operaciones y control de calidad bajo normativas ISO 9001 y BRC Packaging. 
              Liderazgo de equipos mediante la introducción de metodologías ágiles (Sprints, Dailys), optimización de costes y reestructuración de la cadena de suministro.
            </p>
          </VerticalTimelineElement>

          {/* 3. Web Manager & Growth Technologist */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            dateClassName="timeline-date-highlight"
            date="2013 - 2025 (Proyectos en paralelo)"
            iconStyle={{ background: '#2ec5ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faWordpressSimple} />}
          >
            <h3 className="vertical-timeline-element-title">Web Manager & Growth Technologist</h3>
            <h4 className="vertical-timeline-element-subtitle">Proyectos Digitales</h4>
            <p>
              Gestión técnica de portales web (WordPress) enfocada en la optimización de rendimiento (WPO) y UX/UI. 
              Ejecución y analítica de estrategias de captación digital y optimización del embudo de conversión para maximizar el ROI.
            </p>
          </VerticalTimelineElement>

          {/* 4. Coordinador de acogida */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            dateClassName="timeline-date-highlight"
            date="2011 - 2012"
            iconStyle={{ background: '#2ec5ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faMapLocationDot} />}
          >
            <h3 className="vertical-timeline-element-title">Coordinador de acogida</h3>
            <h4 className="vertical-timeline-element-subtitle">Freelance (Reino Unido)</h4>
            <p>
              Onboarding e integración de estudiantes en instituciones educativas del Reino Unido (residencias, academias, universidades). 
              Gestión de stakeholders, resolución de incidencias bajo presión, comunicación intercultural y priorización de tareas en entornos multilingües.
            </p>
          </VerticalTimelineElement>

          {/* 5. Analista SEO */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            dateClassName="timeline-date-highlight"
            date="2010"
            iconStyle={{ background: '#2ec5ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faSistrix} />}
          >
            <h3 className="vertical-timeline-element-title">Analista SEO</h3>
            <h4 className="vertical-timeline-element-subtitle">Tour Operador (Reino Unido)</h4>
            <p>
              Estrategias SEO On-Page y Off-Page para el posicionamiento orgánico de la web en los mercados británico e hispanohablante. 
              Auditorías técnicas, optimización de UX/arquitectura web con desarrolladores y análisis de datos enfocados a maximizar la conversión y el ROI.
            </p>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;