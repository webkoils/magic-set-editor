import React, { useRef } from 'react';
import * as mtg from '@mse/types';

import {
  TypeLine,
  TopLine,
  TextBox,
  Artwork,
  PT,
  Background,
} from './components/index';

import { CardProvider } from '../CardProvider';
import { CardTemplateProvider, useTemplate } from '../CardTemplate/index';
import { templateClasses } from '../CardTemplate/index';
import { MseCard } from '@mse/types';
export const Card: React.FC<
  Required<mtg.MseCardComponentProps> & {
    svgResizing?: boolean;
    editable?: boolean;
    onChange?: (updates: Partial<MseCard>) => void;
    scale?: number;
  }
> = ({ card, svgResizing, editable, onChange = () => {}, scale = 1 }) => {
  const template = useTemplate(card.templateId);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
    >
      <CardProvider onChange={onChange} card={card} editable={editable}>
        {svgResizing ? (
          <svg
            className={template.rootClassName}
            height='100%'
            width={'100%'}
            viewBox={'0 0 375 523'}
            preserveAspectRatio='xMinYMin meet'
          >
            <foreignObject x={0} height={523} width={375} y={0}>
              <div className={templateClasses.card.root}>
                <Background />
                <TopLine />
                <TypeLine />
                <TextBox />
                <Artwork src={card.artworkUrl} />
                <PT />
              </div>
            </foreignObject>{' '}
          </svg>
        ) : (
          <div className={template.rootClassName}>
            <div className={templateClasses.card.root}>
              <Background />
              <TopLine />
              <TypeLine />
              <TextBox />
              <Artwork src={card.artworkUrl} />
              <PT />
            </div>
          </div>
        )}
      </CardProvider>
    </div>
  );
};
