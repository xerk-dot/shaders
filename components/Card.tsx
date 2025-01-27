"use client";

import styles from '@components/Card.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string | any;
  mode?: string | any;
  centered?: boolean;
  glow?: boolean;
  maxWidth?: string;
}

const Card: React.FC<CardProps> = ({ children, mode, title, centered, glow, maxWidth, ...rest }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  let titleElement = (
    <header className={styles.action}>
      <div className={styles.left} aria-hidden="true"></div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.right} aria-hidden="true"></div>
    </header>
  );

  if (mode === 'left') {
    titleElement = (
      <header className={styles.action}>
        <div className={styles.leftCorner} aria-hidden="true"></div>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.right} aria-hidden="true"></div>
      </header>
    );
  }

  if (mode === 'right') {
    titleElement = (
      <header className={styles.action}>
        <div className={styles.left} aria-hidden="true"></div>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.rightCorner} aria-hidden="true"></div>
      </header>
    );
  }

  const cardContent = (
    <article
      className={`${styles.card} ${glow ? styles.glow : ''}`}
      style={{ maxWidth: isMobile ? '95vw' : maxWidth }}
    >
      {titleElement}
      <section className={styles.children}>{children}</section>
    </article>
  );

  return centered ? (
    <div className={styles.centerWrapper}>
      {cardContent}
    </div>
  ) : cardContent;
};

export default Card;
