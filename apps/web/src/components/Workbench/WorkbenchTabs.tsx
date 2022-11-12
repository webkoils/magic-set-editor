import { Box } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
const containerClassStyles = {
  position: 'relative',
  height: '100%',
  width: '100%',
  overflowY: 'hidden',
  overflowX: 'hidden',
};

const tabClassStyles = {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  transition: 'transform 300ms 0s ease-in',
};
export const WorkbenchTabs: React.FC<{
  activeIndex: number;
  children: React.ReactNode[] | React.ReactNode;
}> = ({ children, activeIndex }) => {
  const arrayedChildren = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );
  const styles = useMemo(() => ({}), []);
  const stylesForIndex = useCallback(
    (index: number) => ({
      transform: `translateX(${(index - activeIndex) * 100}%)`,
    }),
    [activeIndex]
  );

  return (
    <Box sx={containerClassStyles} style={styles}>
      {arrayedChildren.map((child, i) => (
        <Box key={i} sx={tabClassStyles} style={stylesForIndex(i)}>
          {child}
        </Box>
      ))}
    </Box>
  );
};
