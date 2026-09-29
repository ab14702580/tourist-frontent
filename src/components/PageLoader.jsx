import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageLoader — shows a thin teal progress bar at the top of the screen
 * on every route change, then hides after transition completes.
 */
export default function PageLoader() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading on route change
    setVisible(true);
    setProgress(20);

    const t1 = setTimeout(() => setProgress(60), 150);
    const t2 = setTimeout(() => setProgress(85), 400);
    const t3 = setTimeout(() => setProgress(100), 700);
    const t4 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-teal-500 rounded-r-full shadow-[0_0_8px_rgba(20,184,166,0.7)] transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? '200ms' : '400ms',
        }}
      />
    </div>
  );
}
