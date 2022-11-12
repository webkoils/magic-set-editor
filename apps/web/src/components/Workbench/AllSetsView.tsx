import Grid from '@mui/material/Unstable_Grid2';
import { Box, ButtonBase, styled, Paper, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { MseCardSet } from '@mse/types';
import {
  client,
  transformCardSetInput,
  transformCardSetOutput,
} from '../../client-state/remote';
import { Add } from '@mui/icons-material';
import { EditSetDialog } from './EditSetDialog';
import {
  useInsertMutation,
  useQuery,
} from '@supabase-cache-helpers/postgrest-swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
export interface AllSetsViewProps {}

const SetButton = styled(ButtonBase)(() => ({
  width: '100%',
  paddingTop: '100%',
  height: '0',
  position: 'relative',
  '& > *': {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
}));

export const AllSetsView: React.FC<AllSetsViewProps> = () => {
  const router = useRouter();
  const { data } = useQuery(client.from('card_sets').select('*'), 'multiple');
  const [addSet] = useInsertMutation(client.from('card_sets'), 'single', [
    'id',
  ]);
  const cardSets: MseCardSet[] = useMemo(
    () => data?.map(transformCardSetOutput) || [],
    [data]
  );

  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  const onAddClick = useCallback(() => {
    setIsNewDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsNewDialogOpen(false);
  }, []);

  const onSave = useCallback(
    async (cardSet: MseCardSet) => {
      const newSet = await addSet(transformCardSetInput(cardSet, 'insert'));
      if (newSet) {
        setIsNewDialogOpen(false);

        router.push('/workbench/[[...slug]]', '/workbench/' + newSet.id);
      } else {
        alert('error');
      }
    },
    [addSet, router]
  );

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexFlow: 'column nowrap',
        placeContent: 'stretch stretch',
      }}
    >
      <EditSetDialog
        open={isNewDialogOpen}
        onClose={closeDialog}
        onSave={onSave}
      />
      <Grid container spacing={1}>
        {cardSets?.map((cs) => (
          <Grid key={cs.id} xs={12} sm={6} md={2}>
            <Link href={`/workbench/${cs.id}`}>
              <SetButton>
                <Paper
                  elevation={3}
                  sx={
                    {
                      //  bgcolor: 'transparent',
                      //   border: '1px solid rgba(255,255,255,.5)',
                    }
                  }
                >
                  <Grid
                    sx={{ height: '100%', flexFlow: 'column nowrap' }}
                    container
                    justifyContent={'center'}
                    alignItems='center'
                  >
                    {cs.displayName}
                  </Grid>
                </Paper>
              </SetButton>
            </Link>
          </Grid>
        ))}
        <Grid key={'new'} xs={12} sm={6} md={2}>
          <SetButton onClick={onAddClick}>
            <Paper
              elevation={3}
              sx={
                {
                  //  bgcolor: 'transparent',
                  //   border: '1px solid rgba(255,255,255,.5)',
                }
              }
            >
              <Grid
                sx={{ height: '100%', flexFlow: 'column nowrap' }}
                container
                justifyContent={'center'}
                alignItems='center'
              >
                <Add />
                <Typography variant='h5'>New Set</Typography>{' '}
              </Grid>
            </Paper>
          </SetButton>
        </Grid>
      </Grid>
    </Box>
  );
};
