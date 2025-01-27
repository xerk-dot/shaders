'use client';

import { useEffect } from 'react';
import { initializeTheme } from '@common/utilities';

export default function ThemeInitializer() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return null;
} 