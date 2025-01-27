import styles from '@components/Hero.module.scss';
import * as React from 'react';

interface HeroProps {
  word?: string;
}

const Hero: React.FC<HeroProps> = ({ word = "AUGMENT" }) => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{word}</h1>
    </section>
  );
};

export default Hero; 