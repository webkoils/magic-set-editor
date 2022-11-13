import {
  Box,
  BoxProps,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';

const CenteredFormControl = styled(Box)(() => ({
  display: 'inline-flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const SelectMenu = ({
  options,
  onChange,
  value,
  ...props
}: {
  value: string;
  options: { label: string; value: string; icon?: JSX.Element }[];
  onChange: (newValue: string) => void;
} & Partial<Omit<BoxProps, 'value' | 'onChange'>>) => {
  return (
    <CenteredFormControl {...props}>
      <Select
        sx={{ flex: '0 0 100%' }}
        size='small'
        value={value}
        onChange={({ target }: SelectChangeEvent) => {
          onChange(target.value);
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </CenteredFormControl>
  );
};
export default SelectMenu;
