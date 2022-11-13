import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as mtg from '@mse/types';

import {
  TypeLine,
  TopLine,
  TextBox,
  Artwork,
  Background,
  PTBox,
} from './components';

import { useTemplate, templateClasses } from '../CardTemplate/index';
import { MseCard } from '@mse/types';
export const Card: React.FC<
  mtg.MseCardComponentProps & {
    readonly?: boolean;
    width?: number;
    height?: number;
  }
> = ({ card, readonly, onChange, width, height }) => {
  const template = useTemplate(card?.templateId || 'default');
  const [localCard, setLocalCard] = useState(card);

  const onLocalChange = useCallback(
    (updates: Partial<MseCard>) => {
      setLocalCard((currentCard) =>
        currentCard ? { ...currentCard, ...updates } : undefined
      );
      if (onChange) {
        onChange(updates);
      }
    },
    [onChange]
  );
  useEffect(() => {
    if (onChange && card) {
      setLocalCard(card);
    }
  }, [card, onChange]);

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
        <div className={template.rootClassName}>
          <div className={templateClasses.card.root}>
            <Background
              card={localCard}
              onChange={onLocalChange}
              readonly={readonly}
            />
            <TopLine
              card={localCard}
              onChange={onLocalChange}
              readonly={readonly}
            />
            <TypeLine
              card={localCard}
              onChange={onLocalChange}
              readonly={readonly}
            />
            <TextBox
              card={localCard}
              onChange={onLocalChange}
              readonly={readonly}
            />
            <Artwork
              card={localCard}
              onChange={onLocalChange}
              readonly={readonly}
            />
            <PTBox
              card={localCard}
              onChange={onLocalChange}
              readonly={readonly}
            />
          </div>
        </div>
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
