'use client';

import * as React from 'react';

const DebugGrid: React.FC = () => {
  React.useEffect(() => {
    const debugGrid = document.createElement('div');
    let isVisible = !document.body.classList.contains('theme-light');

    const setGridHeight = () => {
      debugGrid.style.height = `${document.documentElement.scrollHeight}px`;
    };

    Object.assign(debugGrid.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '-1',
      margin: '0',
      backgroundImage: `
        repeating-linear-gradient(var(--theme-border) 0 1px, transparent 1px 100%),
        repeating-linear-gradient(90deg, var(--theme-border) 0 1px, transparent 1px 100%)
      `,
      backgroundSize: '1ch 1.25rem',
      pointerEvents: 'none',
      display: isVisible ? 'block' : 'none',
    });

    document.body.appendChild(debugGrid);
    setGridHeight();

    const toggleDebugGrid = () => {
      isVisible = !isVisible;
      debugGrid.style.display = isVisible ? 'block' : 'none';
    };

    const handleDebugGridToggle = () => toggleDebugGrid();
    
    // Add theme change observer
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isLightTheme = document.body.classList.contains('theme-light');
          isVisible = !isLightTheme;
          debugGrid.style.display = isVisible ? 'block' : 'none';
        }
      });
    });

    themeObserver.observe(document.body, { attributes: true });

    const observer = new ResizeObserver(() => {
      setGridHeight();
    });
    observer.observe(document.documentElement);

    window.addEventListener('debugGridToggle', handleDebugGridToggle);
    window.addEventListener('resize', setGridHeight);

    return () => {
      document.body.removeChild(debugGrid);
      window.removeEventListener('resize', setGridHeight);
      window.removeEventListener('debugGridToggle', handleDebugGridToggle);
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return null;
};

export const toggleDebugGrid = (): void => {
  window.dispatchEvent(new CustomEvent('debugGridToggle'));
};

export default DebugGrid;
