import styles from '@components/Hero.module.scss';
import * as React from 'react';

interface HeroProps {
  word?: string;
  isHalfHeight?: boolean;
}

const Hero: React.FC<HeroProps> = ({ word = "AUGMENT", isHalfHeight = false }) => {
  return (
    <section className={styles.hero} style={{ height: isHalfHeight ? '50vh' : '' }}>
      <h1 className={styles.title}>{word}</h1>
    </section>
  );
};

export default Hero; 