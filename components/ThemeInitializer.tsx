'use client';

import { useEffect, useLayoutEffect } from 'react';
import { initializeTheme } from '@common/utilities';
import { usePathname } from 'next/navigation';

// Create a safe useLayoutEffect that falls back to useEffect during SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ThemeInitializer() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'theme-light';
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-blue');
    document.body.classList.add(savedTheme);
  }, [pathname]);

  return null;
} 