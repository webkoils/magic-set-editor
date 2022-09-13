import {
  Chip,
  FormGroup,
  IconButton,
  InputAdornment,
  ListItem,
  TextField,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { FC, useCallback, useState } from 'react';

export const EditCardTypesInput: FC<{
  types: string[];
  onChange: (types: string[]) => void;
}> = ({ onChange, types }) => {
  const [newType, setNewType] = useState('');

  const handleAdd = useCallback(() => {
    onChange(types.slice().concat([newType]));
  }, [newType, onChange, types]);
  const handleDelete = useCallback(
    (index: number) => {
      const newTypes = types.slice(0, index).concat(types.slice(index + 1));
      onChange(newTypes);
    },
    [onChange, types]
  );
  return (
    <FormGroup>
      <TextField
        value={newType}
        onChange={({ target }) => setNewType(target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleAdd}>
                <Add />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {types.map((typeValue, i) => {
        return (
          <ListItem key={typeValue}>
            <Chip label={typeValue} onDelete={handleDelete.bind(null, i)} />
          </ListItem>
        );
      })}
    </FormGroup>
  );
};
