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