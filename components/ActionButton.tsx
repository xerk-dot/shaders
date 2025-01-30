import styles from '@components/ActionButton.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

interface ActionButtonProps {
  onClick?: () => void;
  hotkey?: string | React.ReactElement<{ style?: React.CSSProperties }>;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  isSelected?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, hotkey, children, style, isSelected }) => {
  return (
    <div className={Utilities.classNames(styles.root, isSelected ? styles.selected : null)} onClick={onClick} tabIndex={0} role="button">
      {hotkey && (
        <span className={styles.hotkey}>
          {typeof hotkey === 'string' ? hotkey : React.cloneElement(hotkey, {
            style: { display: 'block', width: '20px', height: '12px', margin: '0' }
          })}
        </span>
      )}
      <span className={styles.content} style={style}>
        {children}
      </span>
    </div>
  );
};

export default ActionButton;
