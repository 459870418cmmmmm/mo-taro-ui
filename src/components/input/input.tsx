import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';
import {Input} from '@tarojs/components';
import {InputProps} from '@tarojs/components/types/Input';
import classnames from '../../utils/classnames';
import {usePropsValue} from '../../utils/use-props-value';
import './index.less';

export type FPSInputProps = InputProps & {
  value?: string;
  defaultValue?: string;
  clearable?: boolean;
  min?: number;
  max?: number;
  onChange?: (val: string) => void;
  onClear?: () => void;
};

export type InputRef = {
  clear: () => void;
  focus: () => void;
  blur: () => void;
};

const classPrefix = 'fps-input';

const FPSInput = forwardRef<InputRef, FPSInputProps>(
  ({defaultValue = '', clearable = false, ...props}, ref) => {
    const [value, setValue] = usePropsValue({defaultValue, ...props});
    const [, setIsFocus] = useState(false);
    const nativeInputRef = useRef<HTMLInputElement>(null);

    const inputClass = classnames(`${classPrefix}-wrapper`, {
      [`${classPrefix}-disabled`]: props.disabled,
    });

    const showClearIcon = () => {
      return clearable && value;
    };

    const handleClear = () => {
      setValue('');
      props.onClear?.();
    };

    const bound = (val, min, max) => {
      let ret = val;
      if (min !== undefined) {
        ret = Math.max(val, min);
      }
      if (max !== undefined) {
        ret = Math.min(ret, max);
      }
      return ret;
    };

    const checkValue = () => {
      let nextValue = value;
      if (props.type === 'number') {
        nextValue = nextValue && bound(parseFloat(nextValue), props.min, props.max).toString();
      }
      if (nextValue !== value) {
        setValue(nextValue);
      }
    };

    useImperativeHandle(ref, () => ({
      clear: () => {
        setValue('');
      },
      focus: () => {
        nativeInputRef.current?.focus();
      },
      blur: () => {
        nativeInputRef.current?.blur();
      },
    }));

    return (
      <div className={inputClass}>
        <Input
          {...props}
          ref={nativeInputRef}
          className={classPrefix}
          value={value}
          // @ts-ignore
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onFocus={(e) => {
            setIsFocus(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            checkValue();
            props.onBlur?.(e);
          }}
        />
        {showClearIcon() && (
          <div className={`${classPrefix}-clear`} onClick={handleClear}>
            <img
              src="https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-circle-close.svg"
              alt="close"
            />
          </div>
        )}
      </div>
    );
  }
);

export default FPSInput;
