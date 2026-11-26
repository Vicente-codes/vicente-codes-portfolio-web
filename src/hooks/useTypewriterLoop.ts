import { useEffect, useRef, useState } from "react";

const TYPE_SPEED = 65;
const DELETE_SPEED = 35;
const HOLD_MS = 3500;
const BETWEEN_MS = 300;
const DEFAULT_START_DELAY = 800;

export type TypewriterPhase =
  | "typing"
  | "holding"
  | "deleting"
  | "between"
  | "reduced";

interface TypewriterOptions {
  startDelay?: number;
}

export interface TypewriterLoopState {
  typed: string;
  phase: TypewriterPhase;
  activeIndex: number;
}

function getReducedMotionQuery(): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return null;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)");
}

function getInitialVisibility(): boolean {
  if (typeof document === "undefined") {
    return true;
  }

  return document.visibilityState !== "hidden";
}

function getInitialState(
  texts: string[],
  reducedMotion: boolean
): TypewriterLoopState {
  if (reducedMotion) {
    return {
      typed: texts[0] ?? "",
      phase: "reduced",
      activeIndex: 0,
    };
  }

  return {
    typed: "",
    phase: "typing",
    activeIndex: 0,
  };
}

// `texts` must be a stable reference (module-level or memoized) so that the
// cycle is not restarted on every render.
export function useTypewriterLoop(
  texts: string[],
  { startDelay = DEFAULT_START_DELAY }: TypewriterOptions = {}
): TypewriterLoopState {
  const [reducedMotion, setReducedMotion] = useState(
    () => getReducedMotionQuery()?.matches ?? false
  );
  const [isDocumentVisible, setIsDocumentVisible] =
    useState<boolean>(getInitialVisibility);
  const [state, setState] = useState<TypewriterLoopState>(() =>
    getInitialState(texts, reducedMotion)
  );

  const hasStartedRef = useRef(false);
  const previousReducedMotionRef = useRef(reducedMotion);

  useEffect(() => {
    const mediaQuery = getReducedMotionQuery();
    if (!mediaQuery) {
      return;
    }

    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState !== "hidden");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (previousReducedMotionRef.current === reducedMotion) {
      return;
    }

    previousReducedMotionRef.current = reducedMotion;

    if (reducedMotion) {
      setState({
        typed: texts[0] ?? "",
        phase: "reduced",
        activeIndex: 0,
      });
      return;
    }

    setState({
      typed: "",
      phase: "typing",
      activeIndex: 0,
    });
  }, [reducedMotion, texts]);

  useEffect(() => {
    if (reducedMotion || !isDocumentVisible || texts.length === 0) {
      return;
    }

    const currentText = texts[state.activeIndex] ?? "";
    const textCount = texts.length;
    let delay: number;

    switch (state.phase) {
      case "typing":
        delay =
          !hasStartedRef.current && state.typed.length === 0
            ? startDelay
            : TYPE_SPEED;
        break;
      case "holding":
        delay = HOLD_MS;
        break;
      case "deleting":
        delay = DELETE_SPEED;
        break;
      case "between":
        delay = BETWEEN_MS;
        break;
      default:
        return;
    }

    const timeoutId = window.setTimeout(() => {
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "hidden"
      ) {
        return;
      }

      switch (state.phase) {
        case "typing": {
          if (state.typed.length < currentText.length) {
            const nextTyped = currentText.slice(0, state.typed.length + 1);
            hasStartedRef.current = true;
            setState({
              typed: nextTyped,
              phase:
                nextTyped.length === currentText.length ? "holding" : "typing",
              activeIndex: state.activeIndex,
            });
            return;
          }

          hasStartedRef.current = true;
          setState({
            typed: currentText,
            phase: "holding",
            activeIndex: state.activeIndex,
          });
          return;
        }
        case "holding":
          setState({
            typed: currentText,
            phase: "deleting",
            activeIndex: state.activeIndex,
          });
          return;
        case "deleting": {
          const nextTyped = state.typed.slice(0, -1);
          setState({
            typed: nextTyped,
            phase: nextTyped.length === 0 ? "between" : "deleting",
            activeIndex: state.activeIndex,
          });
          return;
        }
        case "between": {
          const nextIndex = (state.activeIndex + 1) % textCount;
          setState({
            typed: "",
            phase: "typing",
            activeIndex: nextIndex,
          });
          return;
        }
        default:
          return;
      }
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDocumentVisible, reducedMotion, startDelay, state, texts]);

  return state;
}
