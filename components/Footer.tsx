'use client';

import styles from './Footer.module.scss';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import Badge from '@components/Badge';
import Grid from '@components/Grid';
import Row from '@components/Row';

export default function Footer({ packageVersion = '1.0.0' }) {
  return (
    <footer className={styles.footer}>
      <Grid>
        <Row>
          <div className={styles.container}>
            <div className={`${styles.column} ${styles.main}`}>
              <a 
                href="https://github.com/xerk-dot/shaders"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.titleLink}
              >
                <span className={styles.companyName}>
                  <span className={styles.prefix}>(my)</span>
                  {' '}
                  <span className={styles.name}>shaders</span>
                </span>
                <Badge>Version {packageVersion}</Badge>
              </a>
            </div>

            <div className={styles.socialLinks}>
              <a 
                href="https://github.com/xerk-dot" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://twitter.com/xerkdot" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </Row>
      </Grid>
    </footer>
  );
} 