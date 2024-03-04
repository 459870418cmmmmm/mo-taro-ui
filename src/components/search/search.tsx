import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';
import FPSInput, {InputRef, InputProps} from '../input';
import {usePropsValue} from '../../utils/use-props-value';
import './index.less';

export type SearchProps = InputProps & {
  icon?: React.ReactNode;
  onSearch?: (val: string) => void;
};

export type SearchRef = InputRef;

const classPrefix = 'fps-search';

const Search = forwardRef<SearchRef, SearchProps>(({defaultValue = '', ...props}, ref) => {
  const [value, setValue] = usePropsValue({defaultValue, ...props});
  const [, setIsFocus] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const handleSearch = (value) => {
    props.onSearch?.(value);
  };

  useImperativeHandle(ref, () => ({
    clear: () => inputRef.current?.clear(),
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  return (
    <div className={`${classPrefix}-wrapper`}>
      <div className={`${classPrefix}-icon`} onClick={() => handleSearch(value)}>
        {props.icon || (
          <img src="https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-fps-search.svg" alt="icon" />
        )}
      </div>
      <FPSInput
        {...props}
        ref={inputRef}
        value={value}
        onChange={setValue}
        onFocus={(e) => {
          setIsFocus(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocus(false);
          props.onBlur?.(e);
        }}
        clearable={props.clearable}
      />
    </div>
  );
});

export default Search;
