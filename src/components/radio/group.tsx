import React from 'react';
import {RadioValue} from './radio';
import {RadioGroupContext} from './group-context';
import {usePropsValue} from '../../utils/use-props-value';

export type RadioGroupProps = {
  value?: RadioValue | null;
  defaultValue?: RadioValue | null;
  onChange?: (val: RadioValue) => void;
  children?: React.ReactNode;
};

const Group: React.FC<RadioGroupProps> = ({defaultValue = null, ...props}) => {
  const [value, setValue] = usePropsValue({
    defaultValue,
    onChange: (v) => {
      if (v === null) return;
      props.onChange?.(v);
    },
    ...props,
  });

  return (
    <RadioGroupContext.Provider
      value={{
        value: value === null ? [] : [value],
        check: (v) => {
          setValue(v);
        },
        uncheck: () => {
          return;
        },
      }}
    >
      {props.children}
    </RadioGroupContext.Provider>
  );
};

export default Group;
