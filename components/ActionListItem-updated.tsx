import styles from '@components/ActionListItem.module.scss';
import * as React from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

interface ActionListItemProps {
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
  onHover?: (isHovered: boolean) => void;
  animate?: boolean;
}

const ActionListItem: React.FC<ActionListItemProps> = (props) => {
  const { href, target, onClick, children, icon, style, onHover, animate = false } = props;
  const [isHovered, setIsHovered] = React.useState(false);
  const anchorRef = React.useRef<HTMLAnchorElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const x = useMotionValue(0);

  React.useEffect(() => {
    const ref = href ? anchorRef : divRef;
    if (ref.current) {
      setContainerWidth(ref.current.offsetWidth);
    }
  }, [children, href]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  const iconAnimation = {
    x: isHovered ? containerWidth + containerWidth/10 : 0,
    backgroundColor: isHovered 
      ? ['var(--theme-button-foreground)', 'var(--theme-focused-foreground)']
      : 'var(--theme-button-foreground)',
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.4,
      backgroundColor: {
        duration: 0.3,
        repeat: isHovered ? Infinity : 0,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const textAnimation = {
    filter: isHovered ? "blur(0px)" : "blur(2px)",
    transition: {
      duration: 0.3,
    }
  };

  const IconWrapper = animate ? motion.figure : 'figure';
  const TextWrapper = animate ? motion.span : 'span';

  const defaultStyle = { maxWidth: '140px', ...style };

  if (href) {
    return (
      <a 
        ref={anchorRef}
        className={styles.item} 
        href={href} 
        target={target} 
        style={defaultStyle} 
        tabIndex={0} 
        role="link" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <IconWrapper 
          className={styles.icon} 
          animate={animate ? iconAnimation : undefined}
          initial={{ x: 0 }}
          style={{ x }}
        >
          {icon}
        </IconWrapper>
        <TextWrapper 
          className={styles.text}
          animate={animate ? textAnimation : undefined}
          initial={{ filter: "blur(2px)" }}
        >
          {children}
        </TextWrapper>
      </a>
    );
  }

  return (
    <div 
      ref={divRef}
      className={styles.item} 
      onClick={onClick} 
      style={defaultStyle} 
      tabIndex={0} 
      role="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IconWrapper 
        className={styles.icon} 
        animate={animate ? iconAnimation : undefined}
        initial={{ x: 0 }}
        style={{ x }}
      >
        {icon}
      </IconWrapper>
      <TextWrapper 
        className={styles.text}
        animate={animate ? textAnimation : undefined}
        initial={{ filter: "blur(2px)" }}
      >
        {children}
      </TextWrapper>
    </div>
  );
};

export default ActionListItem;