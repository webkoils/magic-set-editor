import Grid from '@mui/material/Unstable_Grid2';
import { CardGrid, CardList } from '@mse/ui/core';
import sampleCards from '@mse/sample-cards';
import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { MseCard } from '@mse/types';
import { Card } from '../../../../packages/ui/card/src/Card/Card';
import { Sidebar } from '../../components/Layout/Sidebar';
import { Workbench } from '../../components/Workbench/Workbench';

export default function HomePage() {
  const [selectedCard, setSelectedCard] = useState<MseCard | null>(null);
  useEffect(() => console.log(selectedCard), [selectedCard]);
  return <Workbench setId={''} />;
}
