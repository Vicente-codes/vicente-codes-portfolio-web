//Custom Camis imgs
import ccThumbnail from "../assets/images/cc-thumbnailMobile3.png";
import ccHero from "../assets/images/ccHero.png";
import ccProductos from "../assets/images/ccProductos.png";
import ccVolumen from "../assets/images/ccVolumen.png";
import ccCart from "../assets/images/ccCart.png";
import ccP2 from "../assets/images/ccProductDetail2.png";
import ccPanel from "../assets/images/ccPanel.png";
import ccEditar from "../assets/images/ccEditarP.png";
import ccMobiles from "../assets/images/ccMobiles.png";

//Protfolio imgs
import portfolioThumbnail from "../assets/images/vc-thumbnail3.png";
import vcHero from "../assets/images/vcHero.png";
import vcProjects from "../assets/images/vcProjects.png";
import vcProjectDetail from "../assets/images/ccHero.png";
import vcTech from "../assets/images/vcTech.png";
import vcExp from "../assets/images/vcExp.png";
import vcMobiles from "../assets/images/vcMobiles.png";
import vcForm from "../assets/images/form2.png";

/**
 * A technical challenge solved within the project.
 * Images are optional: not every challenge requires screenshots.
 */
export interface ProjectChallenge {
  title: string;
  description: string;
  images?: string[];
}

/**
 * Content structure for the project detail page.
 * name, dates, subtitle, stack, description + main image,
 * role and responsibilities, technical challenges (with optional images),
 * result, link, and optional collaborators.
 */
export interface Project {
  slug: string;
  title: string;
  /** Development period, e.g. "Mar 2024 - Jun 2024" */
  dates: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  stack: string[];
  thumbnail: string;
  /** Main image displayed right below the description */
  heroImage: string;
  /** Author's role and responsibilities in the project */
  role: string;
  challenges: ProjectChallenge[];
  /** Final result / impact of the project */
  result: string;
  repoUrl: string;
  /** Collaborators or mentors, optional if the project was individual */
  collaborators?: string;
}

export const projects: Project[] = [
  {
    slug: "custom-camis",
    title: "Custom Camis",
    dates: "(Oct 2025 - Feb 2026)",
    subtitle: "E-commerce B2B/B2C a medida (Laravel + Docker)",
    shortDescription:
      "E-commerce a medida desarrollado con Laravel 12 para gestionar catálogo, carrito multi-variante y reglas de precios dinámicos por volumen (B2B).",
    fullDescription: `🔹 Desarrollo integral de una plataforma de e‑commerce a medida para Custom Camis, empresa de artes gráficas especializada en la personalización de camisetas bajo demanda. El proyecto sustituye soluciones CMS estándar como Shopify o WooCommerce por una arquitectura propia diseñada para resolver un reto de negocio real: operar simultáneamente como tienda minorista (B2C) y plataforma mayorista (B2B), garantizando una experiencia fluida para consumidores y, al mismo tiempo, soportando la complejidad de las transacciones corporativas.
      
      A nivel tecnológico, la solución se construyó sobre PHP + Laravel siguiendo una arquitectura MVC escalable, con una separación estricta entre lógica de negocio, persistencia y presentación. El proyecto incorpora un modelo de datos relacional en MySQL capaz de gestionar relaciones complejas con atributos (variantes de talla y color), un sistema de roles jerárquico RBAC (Invitado, Cliente y Admin) para proteger áreas críticas y un entorno de despliegue profesional basado en Docker y Laravel Sail, asegurando consistencia entre desarrollo y producción.
      `,
    stack: [
      "PHP",
      "Laravel 12",
      "MySQL 8.0",
      "Blade",
      "Tailwind CSS",
      "Alpine.js",
      "Vite",
      "Docker",
      "Laravel Sail",
    ],
    thumbnail: ccThumbnail,
    heroImage: ccHero,
    role: `Diseñé y desarrollé el ciclo de vida completo de la aplicación, desde el modelo de datos hasta el despliegue, aplicando el patrón MVC de Laravel con una separación estricta entre lógica de negocio, persistencia y presentación.
      
          🔹 Desarrollo full-stack: Asumí el ciclo de vida completo del proyecto, desde el diseño del modelo de datos hasta el despliegue en producción, cubriendo frontend, backend y base de datos.
          🔹 Arquitectura: Diseñé la estructura MVC de Laravel, definiendo la separación entre lógica de negocio (controladores y modelos), persistencia (Eloquent + MySQL) y presentación (Blade + Tailwind).
          🔹 Modelado de datos: Normalicé el esquema relacional hasta 3FN, estableciendo relaciones uno-a-muchos y muchos-a-muchos con tablas pivote para gestionar variantes de producto y carritos.
          🔹 Lógica de negocio compleja: Implementé el motor de precios dinámicos con Accessors de Eloquent, validación de variantes en carritos y reglas B2B/B2C diferenciadas.
          🔹 Seguridad y autenticación: Configuré el sistema RBAC con middlewares personalizados, hashing Bcrypt para contraseñas y protección CSRF en todos los formularios.
          🔹 UI/UX responsive: Desarrollé interfaces mobile-first con Blade, Tailwind CSS y Alpine.js para validaciones en cliente y microinteracciones sin dependencias pesadas.
          🔹 Infraestructura y despliegue: Contenericé la aplicación con Docker y Laravel Sail, definiendo servicios para app, MySQL y Redis, y configurando Nginx como servidor web en producción.
          🔹 Gestión de transacciones: Aseguré la integridad de datos críticos (pedidos, stock, pagos) mediante transacciones ACID con rollback automático en caso de error.
      `,
    challenges: [
      {
        title: "1. Motor de precios B2B dinámicos",
        description:
          "🔹 Diseñé un motor de precios dinámico que detecta automáticamente pedidos superiores a 100 unidades y recalcula el precio unitario en tiempo real mediante Accessors de Eloquent, sin intervención manual, replicando la lógica de descuento B2B de la empresa.",
        images: [ccProductos, ccVolumen],
      },
      {
        title: "2. Carrito multi-variante por talla",
        description:
          "🔹 Modelé relaciones N:M con atributos en tablas pivote (product_user) para permitir que un mismo producto conviva en el carrito como múltiples variantes independientes por talla (ej. 50 unidades talla M y 20 talla L), validando la coherencia producto-talla antes de cada inserción.",
        images: [ccP2, ccCart],
      },
      {
        title: "3. Modelo de datos normalizado",
        description:
          "🔹 Normalicé el esquema de base de datos en MySQL hasta 3FN sobre el motor InnoDB, garantizando integridad referencial (claves foráneas, ON DELETE CASCADE) y transacciones ACID para evitar líneas de pedido huérfanas.",
      },
      {
        title: "4. Panel de administración con RBAC",
        description:
          "🔹 Implementé un sistema de roles jerárquico (RBAC: Invitado, Cliente, Administrador) protegido con Middlewares personalizados, autenticación con hashing Bcrypt y protección CSRF en todos los formularios.",
      images: [ccPanel, ccEditar]
        },
      {
        title: "5. Interfaz responsive Mobile-First",
        description:
          "🔹 Construí una interfaz responsive Mobile-First con Blade y Tailwind CSS, añadiendo interactividad ligera con Alpine.js (selección obligatoria de tallas, flash messages, micro-animaciones en la vista de ofertas) sin necesidad de un framework JS pesado.",
        images: [ccMobiles],
        },
      {
        title: "6. Entorno contenerizado",
        description:
          "🔹 Contenericé el entorno completo con Docker y Laravel Sail (servicios de app, MySQL y Redis vía compose.yaml), eliminando discrepancias entre desarrollo y producción y preparando el despliegue sobre Nginx.",
      },
    ],
    result: `La plataforma proporciona un sistema de comercio electrónico totalmente adaptado a las necesidades operativas de una empresa de Artes Gráficas, centralizando la gestión de pedidos, variantes de producto y operaciones internas en una solución unificada. Gracias a la arquitectura propia, el sistema automatiza reglas de negocio clave, como el recálculo dinámico de precios y la validación de variantes en carritos, reduciendo errores y eliminando dependencias de CMS comerciales con limitaciones estructurales.

            En el plano técnico, la aplicación se apoya en una arquitectura MVC con Laravel, un modelo de datos relacional en MySQL capaz de gestionar relaciones complejas y un sistema de control de acceso basado en roles (RBAC) que protege las áreas críticas de administración. El entorno contenerizado con Docker y Laravel Sail garantiza coherencia entre desarrollo y producción, mientras que el frontend —construido con Blade, Tailwind CSS y Alpine.js— ofrece una experiencia responsive, ligera y optimizada para tiempos de carga reducidos.

            El resultado es una plataforma modular, escalable y preparada para evolucionar, con una base tecnológica sólida que permite incorporar futuras funcionalidades como la personalización de diseños por parte del usuario, nuevas reglas de negocio o ampliaciones del catálogo sin comprometer la estabilidad del sistema.`,
    repoUrl: "https://github.com/Vicente-codes/laravel-myshop-custom-camis",
    collaborators: undefined,
  },
{
    slug: "portfolio-web",
    title: "Vicente Codes",
    dates: "Jun 2026 - Sept 2026",
    subtitle:
      "Interfaz profesional construida con React, TypeScript y SASS, enfocada en arquitectura de componentes y diseño responsive.",
    shortDescription:
      "Portafolio web desarrollado con React y TypeScript, pensado para mostrar habilidades y proyectos mediante una interfaz limpia, responsive y fácil de navegar.",
    fullDescription: `
    Este proyecto nace con el propósito de construir un portafolio web profesional que presente de forma clara mis habilidades y proyectos, ofreciendo una experiencia accesible, rápida y visualmente cuidada. La solución se apoya en una arquitectura de componentes en React, un sistema de estilos consistente y un enfoque centrado en la experiencia de usuario, garantizando una interfaz intuitiva, responsive y fácil de mantener.

    Para alcanzar estos objetivos, tomé varias decisiones técnicas clave:

    🔹 Uso de React y TypeScript para asegurar una base sólida, tipada y mantenible.
    🔹 Implementación de SASS (SCSS) para estilos personalizados y soporte de tema claro/oscuro.
    🔹 Integración de Material‑UI para componentes accesibles y consistentes.
    🔹 Implementación y configuración de React Router para navegación SPA fluida.
    🔹 Desarrollo de un formulario de contacto funcional e integrado con EmailJS, con medidas de seguridad.
    🔹 Desarrollo de pruebas unitarias con Jest y React Testing Library para garantizar fiabilidad y calidad del código.
  `,
    stack: [
      "React",
      "TypeScript",
      "SASS",
      "Material-UI",
      "React Router",
      "EmailJS",
      "Jest",
      "React Testing Library",
      "Node.js",
      "npm",
    ],
    thumbnail: portfolioThumbnail,
    heroImage: vcHero,
    role: `
    🔹 Diseño y desarrollo de componentes reutilizables utilizando React y TypeScript.
    🔹 Implementación de un sistema de estilos personalizado mediante SASS y Material-UI.
    🔹 Optimización de rendimiento, incluyendo carga de imágenes y assets.
    🔹 Diseño responsive y enfoque en UI/UX adaptable.
    🔹 Implementación de una navegación SPA con React Router.
    🔹 Desarrollo de un formulario de contacto seguro con EmailJS, incluyendo validación, feedback visual y protección contra abuso.
    🔹 Escritura de pruebas unitarias con Jest y React Testing Library.
  `,
    challenges: [
      {
        title: "1. Arquitectura de Componentes Modular",
        description: `
        🔹 Diseño de una arquitectura basada en componentes reutilizables y desacoplados, facilitando la mantenibilidad y la evolución del proyecto.

        🔹 Implementación de componentes clave como Project, ProjectDetail, ScrollToTop, entre otros, organizados para maximizar claridad y escalabilidad.
      `,
        images: [vcTech, vcExp],
      },
      {
        title: "2. Sistema de Estilos Personalizado",
        description: `
        🔹 Construcción de un sistema de estilos propio utilizando SASS (SCSS), con soporte para tema claro/oscuro y estilos modulares.

        🔹 Integración de Material‑UI para incorporar componentes accesibles, consistentes y alineados con buenas prácticas de diseño.
      `,
      },
      {
        title: "3.Navegación SPA",
        description: `
        🔹 Implementación de una navegación SPA fluida mediante React Router, mejorando la experiencia de usuario y reduciendo tiempos de carga.
        
        🔹 Gestión de rutas dinámicas para mostrar páginas individuales de detalle de cada proyecto, permitiendo una presentación más completa y profesional del contenido.
      `,
        images: [vcProjects, vcProjectDetail],
      },
      {
        title: "4. Optimización de Rendimiento",
        description: `
        🔹 Optimización de imágenes y assets para reducir el tamaño del bundle y mejorar el tiempo de carga.

        🔹 Aplicación de Lazy Loading en componentes e imágenes para mejorar el rendimiento percibido y la eficiencia del renderizado.
      `,
      },
            {
        title: "5. Formulario de Contacto Seguro con EmailJS",
        description: `
        🔹 Implementación de la lógica de envío mediante EmailJS, permitiendo comunicación directa por email sin necesidad de backend propio.

        🔹 Aplicación de medidas de seguridad orientadas a un formulario público: honeypot anti-bots, control de tasa de envíos (rate limiting) tanto en cliente como en el propio servicio, sanitización de campos para prevenir inyección en cabeceras de email, y límites de longitud en todos los campos.

        🔹 Diseño de un modal de resultado (éxito / error) con Material-UI, con distinto comportamiento según el caso: cierre automático en los envíos correctos y cierre manual en los errores, para asegurar que el usuario reciba feedback claro tras cada interacción.
      `,
      images: [vcForm],
      },
      {
        title: "6. Experiencia de Usuario Intuitiva",
        description: `
        🔹 Diseño responsive adaptado a distintos dispositivos y resoluciones.

        🔹 Implementación de prácticas de accesibilidad (A11Y) para garantizar una experiencia inclusiva.

        🔹 Construcción de una interfaz clara, navegable y centrada en la experiencia del usuario.
      `,
      images: [vcMobiles],
      },
      {
        title: "7. Pruebas Unitarias",
        description: `
        🔹 Desarrollo de pruebas unitarias con Jest y React Testing Library para asegurar la estabilidad y fiabilidad del código.
        
        🔹 Cobertura de componentes críticos como Project y ProjectDetail, validando su comportamiento y renderizado.
      `,
      },
    ],
    result: `El proyecto culmina en un portafolio web profesional diseñado para presentar habilidades y proyectos de forma clara, moderna y altamente optimizada. La plataforma actúa como un punto centralizado donde se muestra mi experiencia técnica, mi capacidad para estructurar aplicaciones React y mi enfoque en la calidad del código y la experiencia de usuario. Gracias a la arquitectura modular implementada, el sistema permite incorporar nuevos proyectos, secciones y mejoras sin comprometer la estabilidad ni la mantenibilidad.

Desde el punto de vista técnico, el portafolio se apoya en una arquitectura basada en React + TypeScript, lo que garantiza tipado estático, robustez y un flujo de desarrollo más seguro. El sistema de estilos, construido con SASS (SCSS) y complementado con Material‑UI, proporciona una interfaz responsive, accesible y visualmente coherente, con soporte para tema claro/oscuro y componentes reutilizables. La navegación SPA con React Router permite una experiencia fluida y sin recargas, incluyendo páginas dinámicas de detalle para cada proyecto, lo que demuestra dominio en la gestión de rutas y vistas dentro de aplicaciones front‑end modernas.

El portafolio incluye además un formulario de contacto totalmente funcional integrado con EmailJS, pensado específicamente para facilitar el contacto directo con reclutadores y colaboradores. Su implementación no se limita al envío de datos: incorpora medidas de seguridad propias de un formulario expuesto públicamente, como protección anti-bots mediante honeypot, control de tasa de envíos y sanitización de entradas, además de una experiencia de usuario cuidada con un modal de resultado que informa con claridad del éxito o error del envío. Este componente demuestra capacidad para llevar una funcionalidad más allá de su versión básica, cubriendo también los aspectos de seguridad y experiencia de usuario que exige un producto real.

En términos de rendimiento, la aplicación incorpora optimizaciones como Lazy Loading, compresión de assets y carga eficiente de imágenes, reduciendo el peso del bundle y mejorando los tiempos de respuesta. Estas decisiones se reflejan en métricas positivas en Lighthouse, tanto en rendimiento como en accesibilidad, evidenciando un enfoque profesional en la calidad técnica del producto. Además, la implementación de prácticas de accesibilidad (A11Y) asegura que la plataforma sea inclusiva y usable por cualquier usuario, reforzando la atención al detalle y la sensibilidad por la experiencia final.

La calidad del código se valida mediante pruebas unitarias con Jest y React Testing Library, cubriendo componentes críticos y asegurando que la aplicación se mantenga estable ante futuras iteraciones. Esto demuestra una adopción clara de buenas prácticas y una mentalidad orientada a la fiabilidad y la prevención de errores.

El resultado es un portafolio moderno, mantenible y preparado para evolucionar, con una base tecnológica sólida que permite incorporar nuevas funcionalidades, mejorar la presentación de proyectos o ampliar la arquitectura sin comprometer la estabilidad. En conjunto, el proyecto refleja competencias clave para entornos profesionales: dominio de React, diseño de interfaces, optimización de rendimiento, accesibilidad, testing, integración de servicios externos con criterios de seguridad, y capacidad para construir soluciones front‑end de calidad orientadas a producto.
  `,
    repoUrl: "https://github.com/tu-usuario/tu-repositorio-portfolio",
    collaborators: undefined,
  },
];

export function getProjectBySlug(
  slug: string | undefined,
): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
