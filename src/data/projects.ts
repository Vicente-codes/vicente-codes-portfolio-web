//Custom Camis imgs
import ccThumbnail from "../assets/images/cc/cc-thumbnailMobile3.png";
import ccHero from "../assets/images/cc/home1.png";
import ccProductos from "../assets/images/cc/ccProductos.png";
import ccVolumen from "../assets/images/cc/ccVolumen.png";
import ccCart from "../assets/images/cc/ccCart.png";
import ccP2 from "../assets/images/cc/ccProductDetail2.png";
import ccPanel from "../assets/images/cc/ccPanel.png";
import ccEditar from "../assets/images/cc/ccEditarP.png";
import ccMobiles from "../assets/images/cc/ccMobiles.png";
import ccVideo from "../assets/videos/ccVideo.mp4";

//Protfolio imgs
import portfolioThumbnail from "../assets/images/vc/vc-thumbnail3.png";
import vcHero from "../assets/images/vc/vcHero.png";
import vcProjects from "../assets/images/vc/vcProjects.png";
import vcProjectDetail from "../assets/images/cc/ccHero.png";
import vcTech from "../assets/images/vc/vcTech.png";
import vcExp from "../assets/images/vc/vcExp.png";
import vcMobiles from "../assets/images/vc/vcMobiles.png";
import vcFormOk from "../assets/images/vc/formOk.png";
import vcFormError from "../assets/images/vc/formError.png";

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
  video?: string;
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
    fullDescription: `Desarrollo integral de una plataforma de e‑commerce a medida para Custom Camis, empresa de artes gráficas especializada en la personalización de camisetas bajo demanda. El proyecto sustituye soluciones CMS estándar como Shopify o WooCommerce por una arquitectura propia diseñada para resolver un reto de negocio real: operar simultáneamente como tienda minorista (B2C) y plataforma mayorista (B2B), garantizando una experiencia fluida para consumidores y, al mismo tiempo, soportando la complejidad de las transacciones corporativas.
      
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
    video: ccVideo,
    role: `Diseñé y desarrollé el ciclo de vida completo de la aplicación, desde el modelo de datos hasta el despliegue, aplicando el patrón MVC de Laravel con una separación estricta entre lógica de negocio, persistencia y presentación.
      
          🔹Desarrollo full-stack: Asumí el ciclo de vida completo del proyecto, desde el diseño del modelo de datos hasta el despliegue en producción, cubriendo frontend, backend y base de datos.

          🔹Arquitectura: Diseñé la estructura MVC de Laravel, definiendo la separación entre lógica de negocio (controladores y modelos), persistencia (Eloquent + MySQL) y presentación (Blade + Tailwind).

          🔹Modelado de datos: Normalicé el esquema relacional hasta 3FN, estableciendo relaciones uno-a-muchos y muchos-a-muchos con tablas pivote para gestionar variantes de producto y carritos.

          🔹Lógica de negocio compleja: Implementé el motor de precios dinámicos con Accessors de Eloquent, validación de variantes en carritos y reglas B2B/B2C diferenciadas.
          
          🔹Seguridad y autenticación: Configuré el sistema RBAC con middlewares personalizados, hashing Bcrypt para contraseñas y protección CSRF en todos los formularios.

          🔹UI/UX responsive: Desarrollé interfaces mobile-first con Blade, Tailwind CSS y Alpine.js para validaciones en cliente y microinteracciones sin dependencias pesadas.

          🔹Infraestructura y despliegue: Contenericé la aplicación con Docker y Laravel Sail, definiendo servicios para app, MySQL y Redis, y configurando Nginx como servidor web en producción.

          🔹Gestión de transacciones: Aseguré la integridad de datos críticos (pedidos, stock, pagos) mediante transacciones ACID con rollback automático en caso de error.
      `,
    challenges: [
      {
        title: "1. Motor de precios B2B dinámicos",
        description:
          "Diseñé un motor de precios dinámico que detecta automáticamente pedidos superiores a 100 unidades y recalcula el precio unitario en tiempo real mediante Accessors de Eloquent, sin intervención manual, replicando la lógica de descuento B2B de la empresa.",
        images: [ccProductos, ccVolumen],
      },
      {
        title: "2. Carrito multi-variante por talla",
        description:
          "Modelé relaciones N:M con atributos en tablas pivote (product_user) para permitir que un mismo producto conviva en el carrito como múltiples variantes independientes por talla (ej. 50 unidades talla M y 20 talla L), validando la coherencia producto-talla antes de cada inserción.",
        images: [ccP2, ccCart],
      },
      {
        title: "3. Modelo de datos normalizado",
        description:
          "Normalicé el esquema de base de datos en MySQL hasta 3FN sobre el motor InnoDB, garantizando integridad referencial (claves foráneas, ON DELETE CASCADE) y transacciones ACID para evitar líneas de pedido huérfanas.",
      },
      {
        title: "4. Panel de administración con RBAC",
        description:
          "Implementé un sistema de roles jerárquico (RBAC: Invitado, Cliente, Administrador) protegido con Middlewares personalizados, autenticación con hashing Bcrypt y protección CSRF en todos los formularios.",
        images: [ccPanel, ccEditar],
      },
      {
        title: "5. Interfaz responsive Mobile-First",
        description:
          "Construí una interfaz responsive Mobile-First con Blade y Tailwind CSS, añadiendo interactividad ligera con Alpine.js (selección obligatoria de tallas, flash messages, micro-animaciones en la vista de ofertas) sin necesidad de un framework JS pesado.",
        images: [ccMobiles],
      },
      {
        title: "6. Entorno contenerizado",
        description:
          "Contenericé el entorno completo con Docker y Laravel Sail (servicios de app, MySQL y Redis vía compose.yaml), eliminando discrepancias entre desarrollo y producción y preparando el despliegue sobre Nginx.",
      },
    ],
    result: `La plataforma proporciona un sistema de comercio electrónico adaptado a las necesidades operativas de una empresa de Artes Gráficas, centralizando la gestión de pedidos, variantes de producto y operaciones internas en una solución unificada. Gracias a la arquitectura propia, el sistema automatiza reglas de negocio, como el recálculo dinámico de precios y la validación de variantes en carritos, reduciendo errores y eliminando dependencias de CMS comerciales con limitaciones estructurales.

            En el plano técnico, la aplicación se apoya en una arquitectura MVC con Laravel, un modelo de datos relacional en MySQL capaz de gestionar relaciones complejas y un sistema de control de acceso basado en roles (RBAC) que protege las áreas críticas de administración. El entorno contenerizado con Docker y Laravel Sail garantiza coherencia entre desarrollo y producción, mientras que el frontend —construido con Blade, Tailwind CSS y Alpine.js— ofrece una experiencia responsive, ligera y optimizada para tiempos de carga reducidos.

            El resultado es una plataforma modular, escalable y preparada para evolucionar, con una base tecnológica que permite incorporar futuras funcionalidades como la personalización de diseños por parte del usuario, nuevas reglas de negocio o ampliaciones del catálogo sin comprometer la estabilidad del sistema.`,
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
    fullDescription: `Este proyecto nace con el propósito de construir un portafolio web profesional que presente de forma clara mis habilidades y proyectos, ofreciendo una experiencia accesible, rápida y visualmente cuidada. La solución se apoya en una arquitectura de componentes en React, un sistema de estilos consistente y un enfoque centrado en la experiencia de usuario, garantizando una interfaz intuitiva, responsive y fácil de mantener.

    Para alcanzar estos objetivos, tomé varias decisiones técnicas:
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
    role: `🔹 Diseño y desarrollo de componentes reutilizables utilizando React y TypeScript.
    🔹 Implementación de un sistema de estilos personalizado mediante SASS y Material-UI.
    🔹 Optimización de rendimiento, incluyendo carga de imágenes y assets.
    🔹 Diseño responsive y enfoque en UI/UX adaptable.
    🔹 Implementación de una navegación SPA con React Router.
    🔹Desarrollo de un formulario de contacto seguro con EmailJS, incluyendo validación, feedback visual y protección contra abuso.
    🔹 Escritura de pruebas unitarias con Jest y React Testing Library.
  `,
    challenges: [
      {
        title: "1. Arquitectura de Componentes Modular",
        description: `Organicé el proyecto mediante componentes React independientes para cada sección de la interfaz, como la navegación, la presentación inicial, la experiencia profesional, las habilidades, los proyectos, el detalle de cada proyecto, el formulario de contacto y el pie de página.

Centralicé la información de los proyectos en projects.ts para separar los datos de la lógica de presentación. De esta forma, puedo añadir o modificar proyectos sin duplicar código y reutilizar componentes como Project y ProjectDetail. También desarrollé una vista dinámica que muestra la información completa de cada proyecto a partir de su slug.`,
        images: [vcTech, vcExp],
      },
      {
        title: "2. Sistema de Estilos Personalizado",
        description: `Mantuve y adapté la estructura de estilos existente para ajustarla a las necesidades actuales del portfolio. Organicé los cambios por componentes y secciones, manteniendo separados los estilos de la navegación, los proyectos, la timeline, el formulario de contacto y las páginas de detalle.

A partir de esa base, realicé ajustes en los layouts responsive, el espaciado y la alineación del contenido. En las páginas de proyecto incorporé clamp() y max-width para mejorar la adaptación a diferentes resoluciones, y añadí efectos hover, transiciones y sombras en elementos concretos de la interfaz.

También integré componentes de Material UI en botones y campos del formulario, coordinando sus estilos con las reglas SCSS existentes para mantener una presentación coherente. Todas las implementaciones que desarrollé tienen en cuenta los dos modos de visualización disponibles, claro y oscuro, para que los componentes mantengan una apariencia legible y consistente independientemente del tema seleccionado.`,
      },
      {
        title: "3.Navegación SPA",
        description: `Implementé una navegación SPA con react-router-dom, incluyendo rutas para la página principal y para las vistas de detalle de cada proyecto. También actualicé la dependencia a react-router-dom v7 y revisé la configuración del router para mantener la navegación operativa en producción.

Añadí un componente ScrollToTop para reiniciar la posición del viewport al cambiar de vista y configuré la navegación de retorno desde las páginas de detalle hacia la sección de proyectos. En la página principal incorporé desplazamiento suave entre secciones y actualicé la URL sin añadir hashes innecesarios. `,
        images: [vcProjects, vcProjectDetail],
      },
      {
        title: "4. Optimización de Rendimiento",
        description: `Simplifiqué la estructura del proyecto eliminando mocks, imágenes y estilos que ya no se utilizaban. Además, mantuve los datos de los proyectos en una única fuente centralizada para reducir duplicaciones y facilitar el mantenimiento.

Revisé la lógica de la aplicación para eliminar efectos redundantes y simplificar el control del estado, incluido el cambio de tema.`,
      },
      {
        title: "5. Formulario de Contacto Seguro con EmailJS",
        description: `Implementé la lógica de envío mediante EmailJS para permitir la comunicación directa por email sin necesidad de desarrollar un backend propio. El formulario valida los campos obligatorios, controla los espacios al inicio y al final del texto y aplica límites de longitud para evitar entradas excesivamente extensas.

Al tratarse de un formulario público, incorporé varias medidas de protección:
🔹Añadí un campo honeypot oculto para detectar envíos automatizados.
🔹Implementé control de tasa de envíos.
🔹Saniticé los valores introducidos antes de enviarlos para reducir el riesgo de inyección.
🔹Establecí límites de longitud para todos los campos del formulario.
🔹Configuré mensajes de validación para indicar al usuario qué información debe corregir.

También desarrollé un modal de resultado con Material UI para informar sobre el estado del envío. En caso de éxito, el modal se cierra automáticamente después de mostrar la confirmación. Si se produce un error, permanece abierto hasta que el usuario lo cierra manualmente, asegurando que el feedback no desaparezca antes de que pueda leerlo.

Además, adapté los placeholders, las etiquetas y los mensajes de ayuda al español, y coordiné los estilos de los campos con los temas claro y oscuro de la aplicación`,
        images: [vcFormOk, vcFormError],
      },
      {
        title: "6. Experiencia de Usuario Intuitiva",
        description: `El usuario puede recorrer el portfolio de forma directa: acceder a las secciones principales, consultar proyectos, abrir sus imágenes en tamaño completo y volver a la lista de trabajos sin perder el contexto.

Añadí animaciones, estados hover, botones consistentes y layouts adaptables a dispositivos móviles. La navegación utiliza desplazamiento suave, mientras que la información sobre mi experiencia, mis habilidades y mis proyectos se organiza en bloques diferenciados para facilitar su consulta.
`,
        images: [vcMobiles],
      },
      {
        title: "7. Despliegue",
        description: `El proyecto está preparado para un despliegue en producción mediante GitHub y Vercel, conectando el repositorio con la plataforma de hosting para automatizar el proceso de integración y publicación.

Configuré Vercel para detectar el proyecto directamente desde GitHub y ejecutar automáticamente el proceso de compilación cada vez que se incorporan cambios a la rama principal. De esta forma, el flujo de trabajo queda integrado con el control de versiones: después de validar una modificación localmente, basta con publicar el commit en el repositorio para iniciar un nuevo despliegue.

También configuré las variables de entorno necesarias para la integración con EmailJS, manteniendo separados del código fuente el Service ID, el Template ID y la Public Key. Estas variables se gestionan desde la configuración de Vercel y se aplican a los entornos de producción y preview sin exponer sus valores en el repositorio.

Como resultado, el portfolio está publicado en una URL pública y cuenta con un flujo de despliegue reproducible, automatizado y preparado para evolucionar junto con el proyecto. Con esta configuración se pretende demostrar experiencia práctica con Git, GitHub, gestión de variables de entorno, integración continua y publicación de aplicaciones frontend modernas.`,
      },
    ],
    result: `El proyecto culmina en un portafolio web profesional diseñado para presentar mis habilidades y proyectos de forma clara, moderna y optimizada. La plataforma actúa como un punto centralizado donde se muestra mi experiencia técnica, mi capacidad para estructurar aplicaciones React y mi enfoque en la calidad del código y la experiencia de usuario. Gracias a la arquitectura modular implementada, el sistema permite incorporar nuevos proyectos, secciones y mejoras sin comprometer la estabilidad ni la mantenibilidad.

Desde el punto de vista técnico, el portafolio se apoya en una arquitectura basada en React + TypeScript, lo que garantiza tipado estático, robustez y un flujo de desarrollo más seguro. El sistema de estilos, construido con SASS (SCSS) y complementado con Material‑UI, proporciona una interfaz responsive, accesible y visualmente coherente, con soporte para tema claro/oscuro y componentes reutilizables. La navegación SPA con React Router permite una experiencia fluida y sin recargas, incluyendo páginas dinámicas de detalle para cada proyecto.

El portafolio incluye además un formulario de contacto totalmente funcional integrado con EmailJS, pensado específicamente para facilitar el contacto directo con colaboradores. Su implementación no se limita al envío de datos: incorpora medidas de seguridad propias de un formulario expuesto públicamente, como protección anti-bots mediante honeypot, control de tasa de envíos y sanitización de entradas, además de una experiencia de usuario cuidada con un modal de resultado que informa con claridad del éxito o error del envío. 

El resultado es una aplicación que combina presentación profesional, navegación fluida y una base técnica preparada para seguir incorporando proyectos, contenidos y mejoras sin modificar la estructura principal. El portfolio no solo muestra mi experiencia, sino también mi forma de trabajar con React, TypeScript, routing, responsive design, gestión del estado, integración de servicios externos y atención a la experiencia de usuario.`,
    repoUrl: "https://github.com/Vicente-codes/vicente-codes-portfolio-web",
    collaborators: undefined,
  },
];

export function getProjectBySlug(
  slug: string | undefined,
): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
