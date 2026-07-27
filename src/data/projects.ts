import camisThumbnail from "../assets/images/camis.png";
import camis01 from "../assets/images/camis01.png";
import camis02 from "../assets/images/camis02.png";
import camis03 from "../assets/images/camis03.png";
import camis04 from "../assets/images/camis04.png";
import camis05 from "../assets/images/camis05.png";
import camis06 from "../assets/images/camis06.png";
import camis07 from "../assets/images/camis07.png";
import camis08 from "../assets/images/camis08.png";
import camis09 from "../assets/images/camis09.png";
import camis10 from "../assets/images/camis10.png";
import camis11 from "../assets/images/camis11.png";
import camis12 from "../assets/images/camis12.png";
import camis16 from "../assets/images/camis16.png";
import camis17 from "../assets/images/camis17.png";
import mock07 from "../assets/images/mock07.png";
import mock01 from "../assets/images/mock01.png";

export interface ProjectChallenge {
  title: string;
  description: string;
  images?: string[];
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
    thumbnail: camis01,
    images: [camisThumbnail, camis01, camis02, camis03, camis04, camis05, camis06, camis07, camis08, camis09, camis10, camis11],
    challenges: [
      {
        title: "Gestión de stock y pedidos",
        description:
          "Diseño del flujo de confirmación de pedido para evitar inconsistencias de stock entre la selección del carrito y la confirmación final de compra.",
        images: [camis02, camis04],
      },
      {
        title: "Panel de administración",
        description:
          "Implementación de un panel completo con control de acceso por roles para la gestión de productos, categorías y usuarios, separado del área pública de la tienda.",
        images: [camis12],
      },
      {
        title: "Descuento por volumen",
        description:
          "Implementación de un panel completo con control de acceso por roles para la gestión de productos, categorías y usuarios, separado del área pública de la tienda.",
        images: [camis16, camis17, camis02, camis04],
      }
    ],
    repoUrl: "https://github.com/Vicente-codes/laravel-myshop-custom-camis",
  },
  {
    slug: "React project",
    title: "React project",
    subtitle: "E-commerce de camisetas personalizadas",
    shortDescription:
      "App de comercio electrónico desarrollada principalmente en PHP con Laravel para la gestión y venta de camisetas personalizadas.",
    fullDescription:
      "Aplicación de comercio electrónico full-stack construida con Laravel (PHP), pensada para la venta y personalización de camisetas. Incluye gestión de catálogo, carrito de compra, procesamiento de pedidos y un panel de administración completo para la gestión de productos, categorías y usuarios.",
    stack: ["PHP", "Laravel", "MySQL", "Bootstrap", "Blade"],
    thumbnail: mock07,
    images: [mock07],
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
          images: [mock07, mock01],
      },
    ],
    repoUrl: "https://github.com/Vicente-codes/laravel-myshop-custom-camis",
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}