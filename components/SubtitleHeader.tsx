import React from 'react';
import styles from './SubtitleHeader.module.scss';

interface SubtitleHeaderProps {
  text: string;
}

const SubtitleHeader: React.FC<SubtitleHeaderProps> = ({ text }) => {
  return <h3 className={styles.subtitle}>{text}</h3>;
};

export default SubtitleHeader;