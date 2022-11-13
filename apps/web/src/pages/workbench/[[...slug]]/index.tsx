import { useMemo } from 'react';
import { CardSetView } from '../../../components/Workbench/CardSetView';
import { useRouter } from 'next/router';
import { AllSetsView } from '../../../components/Workbench/AllSetsView';
import { CardSetStateProvider } from '../../../client-state/CardSetState';
import { Box } from '@mui/material';
import { WorkbenchNavbar } from '@/components/Layout/WorkbenchNavbar';
import { Navbar } from '@/components/Layout/Navbar';

export default function WorkbenchPage() {
  const router = useRouter();

  const [setId]: (string | undefined)[] = useMemo(() => {
    return router.isReady && router.query.slug
      ? Array.isArray(router.query.slug)
        ? router.query.slug
        : [router.query.slug]
      : [];
  }, [router?.query, router?.isReady]);

  return router.isReady ? (
    <Box
      sx={{
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignContent: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: '0rem',
        paddingBottom: '0rem',
      }}
    >
      {!setId ? (
        <>
          <Navbar />
          <AllSetsView />
        </>
      ) : (
        <CardSetStateProvider cardSetId={setId}>
          <WorkbenchNavbar />
          <CardSetView cardSetId={setId} />
        </CardSetStateProvider>
      )}
    </Box>
  ) : (
    <>LOADING</>
  );
}
