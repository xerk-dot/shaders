import styles from '@components/DropdownMenu.module.scss';

import * as React from 'react';

import ActionButton from '@components/ActionButton';
import ActionListItem from '@components/ActionListItem-updated';

import { useHotkeys } from '@modules/hotkeys';

interface DropdownMenuItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
}

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: (event?: MouseEvent | TouchEvent | KeyboardEvent) => void;
  items?: DropdownMenuItemProps[];
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>((props, ref) => {
  const { onClose, items, style, ...rest } = props;

  const handleHotkey = () => {
    if (onClose) onClose();
  };

  useHotkeys('space', handleHotkey);

  return (
    <div ref={ref} className={styles.root} style={style} {...rest}>
      {items && items.map((each, index) => <ActionListItem key={`action-items-${index}`} children={each.children} icon={each.icon} href={each.href} target={each.target} onClick={each.onClick} />)}

      <footer className={styles.footer}>
        Press space to{' '}
        <ActionButton
          hotkey="␣"
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          Close
        </ActionButton>
      </footer>
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
