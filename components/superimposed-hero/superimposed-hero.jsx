import { useRef } from 'react';
import styles from './superimposed-hero.module.css';

export const SuperimposedHero = () => {
  const textRef = useRef();

  return (
    <div className={styles.hero}>
      <div className={styles.textContainer}>
        <h1 ref={textRef} className={styles.text}>
          SHADERS
        </h1>
      </div>
    </div>
  );
}; 