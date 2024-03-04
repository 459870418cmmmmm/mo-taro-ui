import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';
import FPSInput, {InputRef, InputProps} from '../input';
import {usePropsValue} from '../../utils/use-props-value';
import './index.less';

export type InputNumberProps = InputProps & {
  disableMinus?: boolean;
  disablePlus?: boolean;
  onAdd?: () => void;
  onReduce?: () => void;
};

export type InputNumberRef = InputRef;

const classPrefix = 'fps-input-number';

const InputNumber = forwardRef<InputNumberRef, InputNumberProps>(
  ({defaultValue = '', disableMinus = false, disablePlus = false, ...props}, ref) => {
    const [value, setValue] = usePropsValue({defaultValue, ...props});
    const [, setIsFocus] = useState(false);
    const inputRef = useRef<InputRef>(null);

    useImperativeHandle(ref, () => ({
      clear: () => inputRef.current?.clear(),
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }));

    const handleAdd = () => {
      if (disablePlus) {
        return;
      }
      const val = parseInt(value);
      if (val < props.max) {
        setValue(val + 1);
        // @ts-ignore
        props?.onAdd(val + 1);
        return;
      }
      // @ts-ignore
      props?.onAdd(val);
    };

    const handleReduce = () => {
      if (disableMinus) {
        return;
      }
      const val = parseInt(value);
      if (val > props.min) {
        setValue(val - 1);
        // @ts-ignore
        props?.onReduce(val - 1);
        return;
      }
      // @ts-ignore
      props?.onReduce(val);
    };

    return (
      <div className={`${classPrefix}-wrapper`}>
        <div className={`${classPrefix}-minus`} onClick={handleReduce}>
          <img
            src={`https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-minus-${
              disableMinus ? 'disabled' : 'enabled'
            }.svg`}
            alt="minus"
          />
        </div>
        <div className={classPrefix}>
          <FPSInput
            {...props}
            type="number"
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
            disabled
          />
        </div>
        <div className={`${classPrefix}-plus`} onClick={handleAdd}>
          <img
            src={`https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-plus-${
              disablePlus ? 'disabled' : 'enabled'
            }.svg`}
            alt="plus"
          />
        </div>
      </div>
    );
  }
);

export default InputNumber;
