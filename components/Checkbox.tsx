'use client';

import styles from '@components/Checkbox.module.scss';
import * as React from 'react';
import * as Utilities from '@common/utilities';
import { useState, useRef, useEffect, useId } from 'react';

interface CheckboxProps {
  style?: React.CSSProperties;
  name?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  children?: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  style, 
  name, 
  checked = false, 
  onChange,
  onClick,
  children 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const checkboxId = useId();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onClick) {
        onClick(event as any);
      }
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div
      className={Utilities.classNames(styles.section, {
        [styles.checked]: checked,
        [styles.focused]: isFocused,
      })}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.relative}>
        <input 
          className={styles.input} 
          id={checkboxId} 
          type="checkbox" 
          name={name} 
          checked={checked}
          onChange={(e) => onChange?.(e)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <label className={styles.figure} htmlFor={checkboxId}>
          {checked ? '╳' : '\u00A0'}
        </label>
      </div>
      <div className={styles.right}>&nbsp;&nbsp;{children}</div>
    </div>
  );
}

export default Checkbox;
