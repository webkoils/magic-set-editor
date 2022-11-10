import React, { useMemo } from 'react';
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
import { useTemplate } from '../CardTemplate/index';
import { templateClasses } from '../CardTemplate/index';
import { MseCard } from '@mse/types';
export const Card: React.FC<
  Required<mtg.MseCardComponentProps> & {
    editable?: boolean;
    onChange?: (updates: Partial<MseCard>) => void;
    width?: number;
    height?: number;
  }
> = ({ card, editable, onChange = () => {}, width, height }) => {
  const template = useTemplate(card.templateId);
  const scale = useMemo(() => {
    if (typeof width === 'undefined' && typeof height === 'undefined') {
      return 1;
    }
    if (width) {
      return Math.min(2, width / 375);
    }
    if (height) {
      return Math.min(2, height / 523);
    }
    return 1;
  }, [width, height]);
  return (
    <div
      style={{
        width: Math.min(750 * 2, scale * 375),
        height: Math.min(523 * 2, scale * 523),
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <CardProvider onChange={onChange} card={card} editable={editable}>
          <div className={template.rootClassName}>
            <div className={templateClasses.card.root}>
              <Background />
              <TopLine />
              <TypeLine />
              <TextBox />
              <Artwork />
              <PT />
            </div>
          </div>
        </CardProvider>
      </div>
    </div>
  );
};
/** svg foreign object resizing

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

 */
