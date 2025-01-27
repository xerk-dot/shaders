import React, { ReactNode } from 'react';
import styles from './ResponsiveTextDisplay.module.scss';

interface ResponsiveTextDisplayProps {
  data: { text1: ReactNode; text2: ReactNode; text3: ReactNode };
}

const ResponsiveTextDisplay: React.FC<ResponsiveTextDisplayProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <div>{data.text1}</div>
      <div>{data.text2}</div>
      <div>{data.text3}</div>
    </div>
  );
};

export default ResponsiveTextDisplay;