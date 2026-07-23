import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// No hace scroll si la navegación incluye un hash (#projects, #history...)
// porque en ese caso queremos que el navegador/scrollIntoView gestione la posición.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;