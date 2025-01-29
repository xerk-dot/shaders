'use client';

import { useEffect, useLayoutEffect } from 'react';
import { initializeTheme } from '@common/utilities';

// Create a safe useLayoutEffect that falls back to useEffect during SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ThemeInitializer() {
  useIsomorphicLayoutEffect(() => {
    // Run theme initialization immediately
    initializeTheme();
  }, []);

  // Also add a backup initialization in case the layout effect doesn't run
  useEffect(() => {
    const body = document.body;
    if (!body.classList.contains('theme-light') && 
        !body.classList.contains('theme-dark') && 
        !body.classList.contains('theme-blue')) {
      initializeTheme();
    }
  }, []);

  return null;
} 