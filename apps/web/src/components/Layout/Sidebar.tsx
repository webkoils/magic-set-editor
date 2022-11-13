import { Box, IconButton, Paper } from '@mui/material';
import { ChevronRightOutlined } from '@mui/icons-material';
import React, {
  useEffect,
  useMemo,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from 'react';

const anchorStyles = {
  right: {
    container: { borderLeft: 'solid 1px rgba(255,255,255,.5)' },

    resizeHandle: {
      left: '-1rem',
      top: 0,
      bottom: 0,
      width: '2rem',
      cursor: 'ew-resize',
    },
    toggleButton: { left: '-.5rem' },
    toggleIcon: { transform: 'rotate(0,0,0)' },
    toggleIconOpen: { transform: 'rotate(0,0,0)' },
  },
  left: {
    container: { borderRight: 'solid 1px rgba(255,255,255,.5)' },

    resizeHandle: {
      top: 0,
      bottom: 0,
      width: '2rem',
      cursor: 'ew-resize',
    },
    toggleButton: { top: '-.5rem' },
    toggleIcon: { transform: 'rotate(0,180,0)' },
    toggleIconOpen: { transform: 'rotate(0,0,0)' },
  },
  bottom: {
    container: { borderTop: 'solid 1px rgba(255,255,255,.5)' },

    resizeHandle: {
      top: '-1rem',
      bottom: 'auto',
      height: '2rem',
      cursor: 'ns-resize',
      right: 0,
      left: 0,
    },
    toggleButton: { right: '-.5rem' },
    toggleIcon: { transform: 'rotate(0,90,0)' },
    toggleIconOpen: { transform: 'rotate(0,-90,0)' },
  },
};

export const Sidebar: React.FC<
  PropsWithChildren<{
    anchor?: 'right' | 'left' | 'bottom';
    resize?: boolean;
    minSize?: number;
    maxSize?: number;
    defaultSize?: number;
    open: boolean;
    onToggle?: (...args: any[]) => void;
    onResize?: (newSize: string | number) => void;
  }>
> = ({
  children,
  anchor = 'left',
  resize = false,
  minSize = 0.1,
  maxSize = 0.3,
  defaultSize = 0.2,
  open,
  onResize,
  onToggle,
}) => {
  const [currentSize, setCurrentSize] = useState(defaultSize || 0.24);
  const isOpenRef = useRef(open);

  const isResizingRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = open;
  }, [open]);

  const onMouseDown = useCallback(() => {
    if (isOpenRef.current) isResizingRef.current = true;
  }, []);

  const onMouseUp = useCallback(() => {
    isResizingRef.current = false;
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isResizingRef.current) {
        if (anchor === 'bottom') {
          const y = event.pageY;
          event.preventDefault();
          event.stopPropagation();

          setCurrentSize(y / window.innerHeight);
        } else {
          const x = event.pageX;
          event.preventDefault();
          event.stopPropagation();

          setCurrentSize(x / window.innerWidth);
        }
      }
    },
    [anchor]
  );
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);
  useEffect(() => {
    onResize && onResize(currentSize);
  }, [currentSize, onResize]);

  const containerStyles = useMemo(
    () => ({
      flex:
        '0 0 ' +
        (!open
          ? '0%'
          : 100 *
              Math.max(
                minSize,
                Math.min(
                  maxSize,
                  anchor === 'left' ? currentSize : 1 - currentSize
                )
              ) +
            '%'),
      // transition: !isResizingRef.current
      //   ? `flex-basis 0ms ${open ? '0ms' : '200ms'} linear`
      //   : undefined,
      minWidth: anchor !== 'bottom' && !open ? '0' : undefined,
      minHeight: anchor === 'bottom' && !open ? '0' : undefined,

      ...anchorStyles[anchor].container,
    }),
    [currentSize, open, anchor, maxSize, minSize]
  );

  return (
    <Box
      style={containerStyles}
      sx={{
        position: 'relative',
        maxWidth: anchor === 'bottom' ? '100%' : maxSize * 100 + '%',
        minWidth: anchor === 'bottom' ? '100%' : minSize * 100 + '%',
        maxHeight: anchor !== 'bottom' ? '100%' : maxSize * 100 + '%',
        minHeight: anchor !== 'bottom' ? '100%' : minSize * 100 + '%',
        height: anchor !== 'bottom' ? '100%' : undefined,
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          display: 'block',
          height: '100%',
          width: '100%',
        }}
      >
        <Paper sx={{ height: '100%', width: '100%', py: 3 }}> {children}</Paper>
      </Box>
      {resize && (
        <>
          <Box
            className='resizing-handle'
            onMouseDown={onMouseDown}
            sx={{
              ...anchorStyles[anchor].resizeHandle,
              position: 'absolute',
            }}
          />
        </>
      )}
      {!!onToggle && (
        <Box
          className='resizing-button'
          sx={{
            position: 'absolute',
            top: '0rem',
            width: '1rem',
            height: '1rem',
          }}
          style={anchorStyles[anchor].toggleButton}
        >
          <IconButton size='small' onClick={onToggle}>
            <ChevronRightOutlined
              sx={{ transition: 'transform 100ms 0s linear' }}
              style={
                open
                  ? anchorStyles[anchor].toggleIconOpen
                  : anchorStyles[anchor].toggleIcon
              }
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
