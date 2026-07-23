---
name: Frontend React
globs: "**/*.tsx"
alwaysApply: false
description: Reglas específicas para archivos TypeScript/JSX del frontend.
---
# Frontend React
- Utiliza importaciones relativas (e.g., `import { Link } from "react-router-dom";`).
- Los componentes son funciones y utilizan hooks de React como `useEffect`.
- Se tipa código con TypeScript para evitar errores en tiempo de compilación.
- Todos los componentes nuevos deben añadirse a `components/index.js` para poder importarse.