import camisThumbnail from "../assets/images/camis.png";

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  stack: string[];
  thumbnail: string;
  images: string[];
  challenges: ProjectChallenge[];
  repoUrl: string;
}

// NOTA: por ahora solo hay una imagen real disponible (camis.png).
// Cuando tengas más capturas (carrito, panel de admin, etc.), impórtalas
// arriba igual que camisThumbnail y añádelas al array `images` de este
// proyecto sin tocar ningún componente.
export const projects: Project[] = [
  {
    slug: "custom-camis",
    title: "Custom Camis",
    subtitle: "E-commerce de camisetas personalizadas",
    shortDescription:
      "App de comercio electrónico desarrollada principalmente en PHP con Laravel para la gestión y venta de camisetas personalizadas.",
    fullDescription:
      "Aplicación de comercio electrónico full-stack construida con Laravel (PHP), pensada para la venta y personalización de camisetas. Incluye gestión de catálogo, carrito de compra, procesamiento de pedidos y un panel de administración completo para la gestión de productos, categorías y usuarios.",
    stack: ["PHP", "Laravel", "MySQL", "Bootstrap", "Blade"],
    thumbnail: camisThumbnail,
    images: [camisThumbnail],
    challenges: [
      {
        title: "Gestión de stock y pedidos",
        description:
          "Diseño del flujo de confirmación de pedido para evitar inconsistencias de stock entre la selección del carrito y la confirmación final de compra.",
      },
      {
        title: "Panel de administración",
        description:
          "Implementación de un panel completo con control de acceso por roles para la gestión de productos, categorías y usuarios, separado del área pública de la tienda.",
      },
    ],
    repoUrl: "https://github.com/Vicente-codes/laravel-myshop-custom-camis",
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}