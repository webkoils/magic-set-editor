import { parseTokens } from './symbol-mapping';
import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useCardContext } from '../index';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactContentEditable, {
  ContentEditableEvent,
} from 'react-contenteditable';
import classNames from 'classnames';
import { useIsMounted } from '../hooks/useIsMounted';

export const decodeEntities = (str: string) => {
  if (str && typeof str === 'string') {
    // strip script/html tags
    let transformed = str.replace(/<br ?\/?>/gi, 'LINEBREAK');
    console.log('string', str, 'transformed1', transformed);

    transformed = transformed
      .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
      .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>?/gim, '')
      .replace(/LINEBREAK/g, '<br />');
    console.log('transformed2', transformed);

    return str;
  }

  return str;
};
export const CardFieldWithoutSymbols: React.FC<
  {
    id:
      | 'name'
      | 'manaCost'
      | 'rulesText'
      | 'flavorText'
      | 'power'
      | 'toughness'
      | 'supertype'
      | 'subtypes'
      | 'types';
    multiline?: boolean;
  } & Omit<React.ComponentPropsWithoutRef<'textarea'>, 'id' | 'onChange'>
> = ({ id, multiline, className }) => {
  const { card, update, editField, onFieldClick } = useCardContext();
  const [isFocused, setIsFocused] = useState(false);
  const isMounted = useIsMounted();
  const inputRef = useRef<HTMLDivElement | null>(null);
  const value = useMemo(() => (card[id] ? String(card[id]) : ''), [card, id]);
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
                    textToken.replace(/\bCARDNAME\b/g, card.name) +
                    '_' +
                    i +
                    '_' +
                    li
                  }
                  dangerouslySetInnerHTML={{
                    __html: textToken.replace(/\bCARDNAME\b/g, card.name),
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
              textToken.replace(/\bCARDNAME\b/g, card.name) +
              '_' +
              'last' +
              '_' +
              li
            }
            dangerouslySetInnerHTML={{
              __html: textToken.replace(/\bCARDNAME\b/g, card.name),
            }}
          ></span>
        );
      return (
        <span key={li} className='MseCardFieldLine'>
          {lineTokens.concat(
            multiline && li < tokens.length - 1
              ? [<br key={'newLine' + li} />]
              : []
          )}
        </span>
      );
    });
  }, [localValue, card?.name, multiline]);
  const nonEditingContent = useMemo(
    () => <React.Fragment key='markup'>{renderedTokens.flat()}</React.Fragment>,
    [renderedTokens]
  );

  const [html, setHtml] = useState(
    typeof window === 'undefined' ? '' : renderToStaticMarkup(nonEditingContent)
  );

  const onChange: React.FormEventHandler<HTMLDivElement> = useCallback(
    (event: ContentEditableEvent) => {
      console.log(event.target.value);
      setLocalValue(decodeEntities(inputRef.current?.innerHTML || ''));
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
        [id]: decodeEntities(
          inputRef.current.innerHTML.replace(/<br>/gi, '\n')
        ),
      });
    }
  }, [id]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (inputRef.current) {
        if (event.key === 'Enter' && !multiline) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    },
    [multiline]
  );

  useEffect(() => {
    if (isFocused) {
      setHtml(value.replace(/\n/gi, '<br>'));
    }
  }, [isFocused, value]);
  useEffect(() => {
    if (!isFocused) {
      setHtml(renderToStaticMarkup(nonEditingContent));
    }
  }, [isFocused, renderedTokens]);

  useEffect(() => {
    setLocalValue((lv) => (lv !== value ? value : lv));
  }, [value]);

  const htmlRef = useRef(html);
  useEffect(() => {
    htmlRef.current = html;
  }, [html]);
  return useMemo(
    () =>
      !isMounted ? (
        <div
          className={classNames(
            'MseCardField',
            'MseCardField-SSR',
            { focused: isFocused },
            { multiline: 'MseCardField-Multiline' },
            className
          )}
        >
          {nonEditingContent}
        </div>
      ) : (
        <ReactContentEditable
          html={html}
          disabled={false}
          innerRef={inputRef}
          className={classNames(
            'MseCardField',
            { focused: isFocused },
            { multiline: 'MseCardField-Multiline' },

            className
          )}
          onFocus={onFocus}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={id}
          onKeyDown={onKeyDown}
        ></ReactContentEditable>
      ),
    [
      html,
      className,
      inputRef,
      onBlur,
      onChange,
      onFocus,
      id,
      isMounted,
      isFocused,
    ]
  );
};
