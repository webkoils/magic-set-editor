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

const anchorRightStyles = {
  container: { borderLeft: 'solid 1px rgba(255,255,255,.5)' },

  resizeHandle: {
    left: '-1rem',
  },
  toggleButton: { left: '-.5rem' },
};
const anchorLeftStyles = {
  container: { borderLeft: 'solid 1px rgba(255,255,255,.5)' },

  resizeHandle: {
    right: '-1rem',
  },
  toggleButton: { right: '-.5rem' },
};

export const Sidebar: React.FC<
  PropsWithChildren<{
    anchor?: 'right' | 'left';
    resize?: boolean;
    minWidth?: number;
    maxWidth?: number;
    defaultWidth?: number;
    open: boolean;
    onToggle?: (...args: any[]) => void;
    onResize?: (newWidth: string | number) => void;
  }>
> = ({
  children,
  anchor = 'left',
  resize = false,
  minWidth = 0.1,
  maxWidth = 0.3,
  defaultWidth = 0.2,
  open,
  onResize,
  onToggle,
}) => {
  const [currentWidth, setCurrentWidth] = useState(defaultWidth || 0.24);
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

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (isResizingRef.current) {
      const x = event.pageX;
      event.preventDefault();
      event.stopPropagation();

      setCurrentWidth(x / window.innerWidth);
    }
  }, []);
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);
  useEffect(() => {
    onResize && onResize(currentWidth);
  }, [currentWidth, onResize]);

  const containerStyles = useMemo(
    () => ({
      flex:
        '0 0 ' +
        (!open
          ? '0%'
          : 100 *
              Math.max(
                minWidth,
                Math.min(
                  maxWidth,
                  anchor === 'right' ? 1 - currentWidth : currentWidth
                )
              ) +
            '%'),
      // transition: !isResizingRef.current
      //   ? `flex-basis 0ms ${open ? '0ms' : '200ms'} linear`
      //   : undefined,
      minWidth: !open ? '0' : undefined,
      ...(anchor === 'left'
        ? anchorLeftStyles.container
        : anchorRightStyles.container),
    }),
    [currentWidth, open, anchor, maxWidth, minWidth]
  );

  return (
    <Box
      style={containerStyles}
      sx={{
        position: 'relative',
        maxWidth: maxWidth * 100 + '%',
        minWidth: minWidth * 100 + '%',
        height: '100%',
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
              position: 'absolute',

              top: 0,
              bottom: 0,
              width: 20,
              cursor: 'ew-resize',
            }}
            style={
              anchor === 'left'
                ? anchorLeftStyles.resizeHandle
                : anchorRightStyles.resizeHandle
            }
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
          style={
            anchor === 'left'
              ? anchorLeftStyles.toggleButton
              : anchorRightStyles.toggleButton
          }
        >
          <IconButton size='small' onClick={onToggle}>
            <ChevronRightOutlined
              sx={{ transition: 'transform 100ms 0s linear' }}
              style={{
                transform:
                  open && anchor === 'left'
                    ? 'rotateY(180deg)'
                    : 'rotateY(0deg)',
              }}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
