import styles from './Footer.module.scss';
import { FaTwitter, FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Badge from '@components/Badge';
import Grid from '@components/Grid';
import Row from '@components/Row';
import ActionListItem from '@components/ActionListItem-updated';
import Link from 'next/link';

export default function Footer({ companyName = 'Company Name', packageVersion = '1.0.0' }) {
  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaDiscord />, url: 'https://discord.com', label: 'Discord' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className={styles.footer}>
      <Grid>
        <Row>
          <div className={styles.container}>
            <div className={`${styles.column} ${styles.main} `}>

              <span className={styles.companyName} >{companyName}&nbsp;</span>
              
                
                  <Badge>Version {packageVersion}</Badge>


              <div className={styles.subtitle}>Join our Community</div>
              <div className={styles.socialLinks}>
                {socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className={`${styles.column} ${styles.secondary}`}>
              <div className={styles.columnTitle}>Company</div>
              <ul className={styles.links}>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/news">News</Link></li>
                <li><Link href="/press">Press</Link></li>
              </ul>
            </div>
            <div className={'md:w-full md:block hidden'}></div>
            <div className={`${styles.column} ${styles.secondary}`}>
              <div className={styles.columnTitle}>Product</div>
              <ul className={styles.links}>
                <li><Link href="/map">WebXR App (map)</Link>
                <ActionListItem 
                  icon={`⭢`} 
                  href="https://github.com/starsof-ar/landing" 
                  target="_blank" 
                  style={{whiteSpace: 'nowrap'}}
                  animate={true}
                >
                  source code
                </ActionListItem>
                </li>
                <li><Link href="/map">Developer Portal</Link>
                <ActionListItem 
                  icon={`⭢`} 
                  href="https://github.com/starsof-ar/landing" 
                  target="_blank" 
                  style={{whiteSpace: 'nowrap'}}
                  animate={true}
                >
                  source code
                </ActionListItem>
                </li>
              </ul>
            </div>

            <div className={`${styles.column} ${styles.secondary}`}>
              <div className={styles.columnTitle}>Resources</div>
              <ul className={styles.links}>
                  <li><Link href="/faqs">FAQs</Link></li>
                  <li><Link href="/support">Support</Link></li>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </Row>
      </Grid>
    </footer>
  );
} 