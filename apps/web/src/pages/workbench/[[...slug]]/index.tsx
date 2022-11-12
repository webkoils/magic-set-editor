import { useMemo } from 'react';
import { CardSetView } from '../../../components/Workbench/CardSetView';
import { useRouter } from 'next/router';
import { AllSetsView } from '../../../components/Workbench/AllSetsView';
import { CardSetStateProvider } from '../../../client-state/CardSetState';

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
