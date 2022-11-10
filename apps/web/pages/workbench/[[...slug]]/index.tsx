import { useCallback, useEffect, useMemo, useState } from 'react';
import { MseCardSet } from '@mse/types';
import { CardSetView } from '../../../components/Workbench/CardSetView';
import { useRouter } from 'next/router';
import { AllSetsView } from '../../../components/Workbench/AllSetsView';
import { client, getCardSetsForUser, saveCardSet } from '@mse/supabase';
import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@supabase-cache-helpers/postgrest-swr';
import { CardSetStateProvider } from '../../../client-state/CardSetState';
import { Box } from '@mui/material';

export default function WorkbenchPage() {
  const router = useRouter();

  const [setId, cardId]: (string | undefined)[] = useMemo(() => {
    return router.isReady && router.query.slug
      ? Array.isArray(router.query.slug)
        ? router.query.slug
        : [router.query.slug]
      : [];
  }, [router?.query, router?.isReady]);

  return router.isReady ? (
    !setId ? (
      <AllSetsView />
    ) : (
      <CardSetStateProvider cardSetId={setId}>
        <CardSetView cardSetId={setId} />
      </CardSetStateProvider>
    )
  ) : (
    <>LOADING</>
  );
}
