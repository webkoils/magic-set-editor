import { MseCardSet } from '@mse/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useSession } from '@supabase/auth-helpers-react';
import React, {
  ChangeEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
export const EditSetDialog: React.FC<
  PropsWithChildren<{
    initialData?: MseCardSet;
    open: boolean;
    onClose: (...args: any[]) => void;
    onSave: (cardSet: MseCardSet) => void;
  }>
> = ({ initialData, open, onClose, onSave }) => {
  const session = useSession();
  const [data, setData] = useState<MseCardSet>(
    initialData || {
      id: '',
      displayName: '',
      slug: '',
      userId: session?.user.id || '',
    }
  );
  const reset = useCallback(() => {
    setData(
      initialData || {
        id: '',
        displayName: '',
        slug: '',
        userId: session?.user.id || '',
      }
    );
  }, [initialData, session?.user.id]);
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [reset, initialData, open]);

  const updateDisplayName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setData((d) => ({
        ...d,
        displayName: event.target.value,
      })),
    []
  );

  const updateSlug = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setData((d) => ({
      ...d,
      slug: event.target.value
        .replace(/ +/g, '-')
        .replace(/[^a-zA-Z0-9-]/gi, '')
        .toLowerCase(),
    }));
  }, []);

  const onSaveClick = useCallback(() => {
    onSave(data);
  }, [data, onSave]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs'>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <TextField
              fullWidth
              type={'text'}
              label='Name'
              value={data.displayName}
              onChange={updateDisplayName}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              type={'text'}
              label='Slug'
              value={data.slug}
              placeholder={data.displayName
                .replace(/ +/g, '-')
                .replace(/[^a-zA-Z0-9-]/gi, '')
                .toLowerCase()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>/@username/</InputAdornment>
                ),
              }}
              onChange={updateSlug}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onSaveClick}>
          Save
        </Button>
        <Button variant='contained' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
