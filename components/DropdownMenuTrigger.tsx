'use client';

import styles from '@components/DropdownMenuTrigger.module.scss';

import * as React from 'react';

import DropdownMenu from '@components/DropdownMenu';
import OutsideElementEvent from '@components/detectors/OutsideElementEvent';

import { createPortal } from 'react-dom';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface DropdownMenuTriggerProps {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  items: any;
}

// TODO(jimmylee):
// This is probably not great that the PopoverTrigger and TooltipTrigger all use a similar code pattern
// And what we should do is combine them all.
// But there is also opportunity for each to diverge in behavior based on feedback after V1. So I'm leaving
// This as is.
function DropdownMenuTrigger({ children, items }: DropdownMenuTriggerProps) {
  const [open, setOpen] = React.useState(false);
  const [willClose, setWillClose] = React.useState(false);
  const [placement, setPlacement] = React.useState<Placement>('bottom');
  const [position, setPosition] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const onClick = React.useCallback((event) => {
    setOpen(true);
  }, []);

  const onHandleFocus = React.useCallback(() => {
    setOpen(true);
  }, []);

  const onOutsideEvent = React.useCallback((event) => {
    setOpen(false);
  }, []);

  const onClose = React.useCallback((event) => {
    setWillClose(true);
  }, []);

  // TODO(jimmylee)
  // This is a terrible hack that needs to be removed from the codebase.
  // I don't know why we have to chain useEffects to fix this problem.
  // But its the only way the setOpen(false) will fire.
  // Probably some strange race condition.
  React.useEffect(() => {
    if (!willClose) {
      return;
    }
    setOpen(false);
    setWillClose(false);
  }, [willClose]);

  React.useEffect(() => {
    if (!open || !triggerRef.current || !elementRef.current) return;

    const calculatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const containerRect = elementRef.current!.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      const spaceAbove = triggerRect.top;
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = window.innerWidth - triggerRect.right;

      const viewportHeightThreshold = window.innerHeight * 0.4;
      const viewportWidthThreshold = window.innerWidth * 0.4;

      let newPlacement: Placement = 'bottom';
      let top = 0;
      let left = 0;

      if (spaceAbove >= viewportHeightThreshold && spaceAbove >= containerRect.height) {
        newPlacement = 'top';
        top = triggerRect.top + scrollY - containerRect.height;
        left = triggerRect.left + scrollX + (triggerRect.width - containerRect.width) / 2;
      } else if (spaceBelow >= viewportHeightThreshold && spaceBelow >= containerRect.height) {
        newPlacement = 'bottom';
        top = triggerRect.bottom + scrollY;
        left = triggerRect.left + scrollX + (triggerRect.width - containerRect.width) / 2;
      } else if (spaceRight >= viewportWidthThreshold && spaceRight >= containerRect.width) {
        newPlacement = 'right';
        top = triggerRect.top + scrollY + (triggerRect.height - containerRect.height) / 2;
        left = triggerRect.right + scrollX;
      } else if (spaceLeft >= viewportWidthThreshold && spaceLeft >= containerRect.width) {
        newPlacement = 'left';
        top = triggerRect.top + scrollY + (triggerRect.height - containerRect.height) / 2;
        left = triggerRect.left + scrollX - containerRect.width;
      } else {
        newPlacement = 'bottom';
        top = triggerRect.bottom + scrollY;
        left = triggerRect.left + scrollX + (triggerRect.width - containerRect.width) / 2;
      }

      if (left < 0) left = 0;
      else if (left + containerRect.width > window.innerWidth) left = window.innerWidth - containerRect.width;

      if (top < 0) top = 0;
      else if (top + containerRect.height > window.innerHeight + scrollY) top = window.innerHeight + scrollY - containerRect.height;

      setPlacement(newPlacement);
      setPosition({ top, left });
    };

    calculatePosition();

    const handleResizeOrScroll = () => calculatePosition();

    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll, true);

    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll, true);
    };
  }, [open]);

  const element = open
    ? createPortal(
        <OutsideElementEvent onOutsideEvent={onOutsideEvent}>
          <DropdownMenu
            onClose={onClose}
            ref={elementRef}
            items={items}
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
              zIndex: `var(--z-index-page-dropdown-menus)`,
            }}
            role="dialog"
            aria-modal="true"
          />
        </OutsideElementEvent>,
        document.body
      )
    : null;

  return (
    <div ref={triggerRef} className={styles.root} onClick={onClick} onFocus={onHandleFocus}>
      {React.cloneElement(children, {
        tabIndex: 0,
      })}
      {element}
    </div>
  );
}

export default DropdownMenuTrigger;
