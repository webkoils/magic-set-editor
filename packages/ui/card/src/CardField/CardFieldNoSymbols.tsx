import { InputState, SymbolInput } from '@mse/symbol-input';
import {
  manaSymbolDelimeters,
  manaSymbolMapping,
  parseTokens,
} from './symbol-mapping';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useCardContext } from '../index';
import {
  renderToStaticMarkup,
  renderToStaticNodeStream,
} from 'react-dom/server';
import ReactContentEditable, {
  ContentEditableEvent,
} from 'react-contenteditable';
export const CardFieldWithoutSymbols: React.FC<
  {
    id:
      | 'name'
      | 'manaCost'
      | 'rulesText'
      | 'flavorText'
      | 'power'
      | 'toughness';
    multiline?: boolean;
  } & Omit<React.ComponentPropsWithoutRef<'textarea'>, 'id' | 'onChange'>
> = ({ id, multiline, className }) => {
  const { card, update, editField, onFieldClick } = useCardContext();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const value = useMemo(() => String(card[id]) || '', [card, id]);
  const [localValue, setLocalValue] = useState(value);
  const renderedTokens = useMemo(() => {
    let tokens = parseTokens(String(localValue));
    return tokens.map((line, li) => {
      let lineTokens: any[] = [];
      let textToken = '';
      line.forEach((t, i) => {
        switch (t.type) {
          case 'string': {
            textToken += t.Component;
            break;
          }
          case 'symbol': {
            textToken.length &&
              lineTokens.push(
                <span
                  key={
                    textToken.replace(/ CARDNAME /g, ' ' + card.name + ' ') +
                    '_' +
                    i +
                    '_' +
                    li
                  }
                  dangerouslySetInnerHTML={{
                    __html: textToken.replace(
                      / CARDNAME /g,
                      ' ' + card.name + ' '
                    ),
                  }}
                ></span>
              );
            textToken = '';
            lineTokens.push(
              <t.Component key={t.raw + '_' + i + '_' + li}>
                {(t as any).value}
              </t.Component>
            );
            break;
          }
        }
      });
      textToken.length &&
        lineTokens.push(
          <span
            key={
              textToken.replace(/ CARDNAME /g, ' ' + card.name + ' ') +
              '_' +
              'last' +
              '_' +
              li
            }
          >
            {textToken.replace(/ CARDNAME /g, ' ' + card.name + ' ')}
          </span>
        );
      return lineTokens.concat(
        li < tokens.length - 1 ? [<br key={'newLine' + li} />] : []
      );
    });
  }, [localValue, card?.name]);
  const [html, setHtml] = useState(
    typeof window === 'undefined'
      ? renderToStaticNodeStream(<>{renderedTokens.flat()}</>)
          .read(1024)
          .toString()
      : renderToStaticMarkup(<>{renderedTokens.flat()}</>)
  );

  const onChange: React.FormEventHandler<HTMLDivElement> = useCallback(
    (event: ContentEditableEvent) => {
      console.log(event.target.value);
      setLocalValue(inputRef.current?.innerHTML || '');
    },
    []
  );
  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
    if (inputRef.current) {
      update({
        [id]: inputRef.current.innerHTML,
      });
    }
  }, [id]);

  useEffect(() => {
    if (isFocused) {
      setHtml(value);
    }
  }, [isFocused, value]);
  useEffect(() => {
    if (!isFocused) {
      setHtml(
        renderToStaticMarkup(
          <React.Fragment key='markup'>{renderedTokens.flat()}</React.Fragment>
        )
      );
    }
  }, [isFocused, renderedTokens]);

  useEffect(() => {
    setLocalValue((lv) => (lv !== value ? value : lv));
  }, [value]);

  const options: Partial<InputState> = useMemo(
    () => ({
      symbols: [
        { code: 'CARDNAME', component: () => <>{card.name}</> },
        ...manaSymbolMapping,
      ],
      delimeters: manaSymbolDelimeters,
      maxLines: multiline ? 10 : 1,
    }),
    [multiline, card?.name]
  );
  const htmlRef = useRef(html);
  useEffect(() => {
    htmlRef.current = html;
  }, [html]);
  return useMemo(
    () => (
      <ReactContentEditable
        html={html}
        suppressContentEditableWarning
        innerRef={inputRef}
        className={className}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
      ></ReactContentEditable>
    ),
    [html, className, inputRef, onBlur, onChange, onFocus]
  );
};
