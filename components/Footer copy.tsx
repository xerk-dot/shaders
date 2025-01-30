'use client';

import styles from './Footer.module.scss';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import Badge from '@components/Badge';

interface FooterProps {
  packageVersion?: string;
}

export default function Footer({ packageVersion = '1.0.0' }) {
  return (
    <footer className={styles.root}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Badge>v{packageVersion}</Badge>
        </div>
        
        <div className={styles.socialLinks}>
          <Badge>
            <a 
              href="https://github.com/xerk-dot" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </Badge>
          <Badge>
            <a 
              href="https://twitter.com/xerkdot" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </Badge>
        </div>
      </div>
    </footer>
  );
} 