'use client';

import { useState, useEffect } from 'react';

/**
 * A hook that returns true if the current viewport matches the given media query
 * @param query The media query to check against
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with a default value based on SSR considerations
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Create the media query list
    const mediaQuery = window.matchMedia(query);

    // Set the initial value
    setMatches(mediaQuery.matches);

    // Create an event listener
    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    // Add the listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]); // Only re-run if the query changes

  return matches;
} 