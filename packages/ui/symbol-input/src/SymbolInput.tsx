import {
  decodeEntities,
  parseTokens,
  SymbolInputToken,
  SymbolMapping,
} from './symbolMapping';
import React, {
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { symbolInputClasses } from './symbolInputClasses';
import ReactContentEditable, {
  ContentEditableEvent,
} from 'react-contenteditable';
import classNames from 'classnames';
import { useIsClient } from '../../../utils/ssr-helpers/index';
const styles: CSSProperties = { whiteSpace: 'pre-wrap' };
export const SymbolInput: React.FC<
  {
    value: string;
    onChange: (newValue: string) => void;
    symbols: SymbolMapping;
    renderToken: (token: SymbolInputToken) => React.ReactNode;
    multiline?: boolean;
    readonly?: boolean;
  } & Omit<
    React.ComponentPropsWithoutRef<'div'>,
    'id' | 'onChange' | 'readonly' | 'multiline'
  >
> = ({
  value,
  onChange,
  multiline,
  className,
  symbols,
  renderToken,
  readonly,
  ...others
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isClient = useIsClient();
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [localValue, setLocalValue] = useState(value);
  const renderedTokens = useMemo(() => {
    let tokens = parseTokens(String(localValue), { symbols });
    return tokens.map((line, li) => {
      let lineTokens: any[] = [];
      let textToken = '';
      line.forEach((t, i) => {
        switch (t.type) {
          case 'string': {
            textToken += t.raw;
            break;
          }
          case 'symbol': {
            if (textToken.length) {
              lineTokens.push(
                renderToken({
                  type: 'string',
                  raw: textToken,
                  key: textToken + '_' + i + '_' + li,
                })
              );
            }
            textToken = '';
            lineTokens.push(renderToken(t));

            break;
          }
        }
      });
      if (textToken.length) {
        lineTokens.push(
          renderToken({
            type: 'string',
            raw: textToken,
            key: textToken + '_' + 'last' + '_' + li,
          })
        );
      }
      return (
        <span key={li} className={symbolInputClasses.line}>
          {lineTokens.concat(
            multiline && li < tokens.length - 1
              ? [<br key={'newLine' + li} />]
              : []
          )}
        </span>
      );
    });
  }, [localValue, renderToken, symbols, multiline]);
  const nonEditingContent = useMemo(
    () => <React.Fragment key='markup'>{renderedTokens.flat()}</React.Fragment>,
    [renderedTokens]
  );

  const [html, setHtml] = useState(
    typeof window === 'undefined' ? '' : renderToStaticMarkup(nonEditingContent)
  );

  const onLocalChange: React.FormEventHandler<HTMLDivElement> = useCallback(
    (event: ContentEditableEvent) => {
      setLocalValue(decodeEntities(inputRef.current?.innerHTML || ''));
    },
    []
  );
  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(
    ({ currentTarget }: React.FocusEvent<HTMLDivElement>) => {
      setIsFocused(false);
      if (inputRef.current) {
        onChange(
          decodeEntities(currentTarget.innerHTML.replace(/<br>/gi, '\n'))
        );
      }
    },
    [onChange]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (inputRef.current) {
        if (event.key === 'Enter') {
          if (!multiline || !event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            inputRef.current?.blur();
          }
        }
      }
    },
    [multiline]
  );

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();

      setHtml(value.replace(/\n/gi, '<br>'));
    }
  }, [isFocused, value]);
  useEffect(() => {
    if (!isFocused) {
      // setHtml(renderToStaticMarkup(nonEditingContent));
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
      !isClient || !isFocused ? (
        <div
          tabIndex={readonly ? undefined : 0}
          style={styles}
          className={classNames(
            symbolInputClasses.root,
            symbolInputClasses.readonly,
            { [symbolInputClasses.focused]: isFocused },
            { [symbolInputClasses.multiline]: multiline },

            className
          )}
          onFocus={onFocus}
          {...others}
        >
          {nonEditingContent}
        </div>
      ) : (
        <ReactContentEditable
          style={styles}
          html={html}
          disabled={false}
          innerRef={inputRef}
          className={classNames(
            symbolInputClasses.root,
            { [symbolInputClasses.focused]: isFocused },
            { [symbolInputClasses.multiline]: multiline },

            className
          )}
          onFocus={onFocus}
          onChange={onLocalChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          {...others}
        ></ReactContentEditable>
      ),
    [
      html,
      className,
      inputRef,
      onBlur,
      onChange,
      onFocus,
      isClient,
      isFocused,
      readonly,
    ]
  );
};
