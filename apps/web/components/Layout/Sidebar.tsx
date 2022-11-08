import {
  AppBar,
  Box,
  css,
  Drawer,
  IconButton,
  Paper,
  SvgIcon,
  Toolbar,
  Typography,
} from '@mui/material';
import { BrandingWordmark } from '@mse/ui/core';
import { CSSProperties } from 'react';
import {
  ArrowCircleRightOutlined,
  ArrowForward,
  ChevronRightOutlined,
  Menu,
} from '@mui/icons-material';
import React, {
  useEffect,
  useMemo,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from 'react';

const anchorRightStyles = {
  container: { borderLeft: 'solid 1px rgba(255,255,255,.78)' },

  resizeHandle: {
    left: '-1rem',
  },
  toggleButton: { left: '-.5rem' },
};
const anchorLeftStyles = {
  container: { borderLeft: 'solid 1px rgba(255,255,255,.78)' },

  resizeHandle: {
    right: '-1rem',
  },
  toggleButton: { right: '-.5rem' },
};

export const Sidebar: React.FC<PropsWithChildren<{
  anchor?: 'right' | 'left';
  resize?: boolean;
  minWidth?: CSSProperties['minWidth'];
  maxWidth?: CSSProperties['maxWidth'];
  defaultWidth?: CSSProperties['width'];
  open: boolean;
  onToggle?: (...args: any[]) => void;
  onResize?: (newWidth: string | number) => void;
}>> = ({
  children,
  anchor = 'left',
  resize = false,
  minWidth = '10vw',
  maxWidth = '50vw',
  defaultWidth = '30vw',
  open,
  onResize,
  onToggle,
}) => {
  const [currentWidth, setCurrentWidth] = useState(defaultWidth || '24%');
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
        let x = event.pageX;
        event.preventDefault();
        event.stopPropagation();
        if (anchor === 'left') {
          setCurrentWidth(100 * (x / window.innerWidth) + '%');
        } else {
          setCurrentWidth(100 * (1 - x / window.innerWidth) + '%');
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
  }, [onMouseMove, onMouseDown]);
  useEffect(() => {
    onResize && onResize(currentWidth);
  }, [currentWidth, onResize]);

  const containerStyles = useMemo(
    () => ({
      flex: '0 0 ' + (!open ? '0%' : currentWidth),
      transition: !isResizingRef.current
        ? 'flex-basis 200ms 0s linear'
        : undefined,
      minWidth: !open ? '0' : undefined,
      ...(anchor === 'left'
        ? anchorLeftStyles.container
        : anchorRightStyles.container),
    }),
    [currentWidth, open, anchor]
  );

  return (
    <Box
      style={containerStyles}
      sx={{
        position: 'relative',
        maxWidth,
        minWidth,
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
        {children}
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
            top: '1rem',
            width: '1rem',
            height: '1rem',
          }}
          style={
            anchor === 'left'
              ? anchorLeftStyles.container
              : anchorRightStyles.container
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
