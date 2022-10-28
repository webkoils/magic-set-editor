import React, { useRef } from 'react';
import * as mtg from '@mse/types';

import {
  TypeLine,
  TopLine,
  TextBox,
  Artwork,
  PT,
  Background,
} from './components';

import { CardProvider } from '../CardProvider';
import { CardTemplateProvider } from '../CardTemplate/CardTemplateProvider';
export const Card: React.FC<Required<mtg.MseCardComponentProps>> = ({
  card,
}) => {
  return (
    <CardProvider card={card}>
      <CardTemplateProvider template={card.template}>
        <svg
          xmlns='http://www.w3.org/1999/xhtml'
          height='100%'
          width={'100%'}
          viewBox={'0 0 375 523'}
          preserveAspectRatio='xMinYMin meet'
        >
          <foreignObject x={0} height={523} width={375} y={0}>
            <div
              style={{
                height: '100%',
                width: '100%',
                fontSize: '1rem',
                color: 'black',
              }}
            >
              <Background />
              <TopLine />
              <TypeLine />
              <TextBox />
              <Artwork src={card.artworkSrc} />
              <PT />
            </div>
          </foreignObject>
        </svg>
      </CardTemplateProvider>
    </CardProvider>
  );
};
