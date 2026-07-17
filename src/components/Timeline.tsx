import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Experiencia</h1>
        <VerticalTimeline>
          
          {/* 1. Frontend Developer - NTT DATA (CaixaBank) */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="2026"
            iconStyle={{ background: '#5000ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Frontend Developer (React & JS)</h3>
            <h4 className="vertical-timeline-element-subtitle">NTT DATA (Proyecto CaixaBank)</h4>
            <p>
              Desarrollo y optimización de plataformas web para el ecosistema financiero (CaixaBankNow y herramientas B2E). 
              Implementación del Design System corporativo, integración de APIs REST, refactorización de código legacy y aseguramiento de la calidad mediante pruebas unitarias (Jest) bajo metodología Scrum.
            </p>
          </VerticalTimelineElement>

          {/* 2. Responsable de Operaciones */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2013 - 2025"
            iconStyle={{ background: '#5000ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
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
            date="2013 - 2025 (Proyectos en paralelo)"
            iconStyle={{ background: '#5000ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Web Manager & Growth Technologist</h3>
            <h4 className="vertical-timeline-element-subtitle">Proyectos Digitales</h4>
            <p>
              Gestión técnica integral de portales web (WordPress) enfocada en la optimización de rendimiento (WPO) y UX/UI. 
              Ejecución y analítica de estrategias de captación digital y optimización del embudo de conversión para maximizar el ROI.
            </p>
          </VerticalTimelineElement>

          {/* 4. Analista SEO */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2010 - 2011"
            iconStyle={{ background: '#5000ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Analista SEO</h3>
            <h4 className="vertical-timeline-element-subtitle">Tour Operador Internacional (Reino Unido)</h4>
            <p>
              Estrategias SEO On-Page y Off-Page para el posicionamiento orgánico en los mercados británico e hispanohablante. 
              Localización de la plataforma web, auditorías técnicas colaborando con desarrolladores y optimización de arquitectura para maximizar la conversión.
            </p>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;