---
name: Arquitectura General
alwaysApply: true
description: Reglas generales sobre la arquitectura del proyecto.
---
# Arquitectura General
- El proyecto utiliza React y TypeScript para el frontend con Create React App (CRA).
- La estructura de carpetas principal es `src/`, que contiene componentes, estilos y datos.
- Se usa npm como gestor de paquetes con scripts definidos en `package.json` (`start`, `build`, `test`).
- No se encuentran archivos o directorios específicos para pruebas unitarias (no hay `__tests__` ni archivos `.test.tsx`/`.spec.tsx`).
- `tsconfig.json` tiene `strict: true` activado y no hay path aliases configurados, solo imports relativos.
- Se utiliza ESLint con configuración de `react-app`.
- Prettier está configurado con `printWidth 80`, comillas simples, punto y coma, trailing commas.

## Rutas del Proyecto
- Se utiliza React Router para gestionar las rutas del proyecto.
- El componente `BrowserRouter` envuelve toda la aplicación para permitir el enrutamiento.
- Se definen dos rutas principales:
  - La ruta raíz (`/`) renderiza el componente `Home`.
  - La ruta `/proyectos/:slug` renderiza el componente `ProjectDetail`, utilizando el parámetro `:slug` para identificar el proyecto específico.
- El componente `ScrollToTop` se utiliza para desplazar automáticamente hacia arriba cuando el usuario cambia de ruta.
- Si la URL contiene un hash (por ejemplo, `/#projects`), el componente `Home` desplaza suavemente hacia la sección correspondiente una vez que se monta.