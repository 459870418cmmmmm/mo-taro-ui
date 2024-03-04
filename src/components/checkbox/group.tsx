import React from 'react';
import {CheckboxValue} from './checkbox';
import {CheckboxGroupContext} from './group-context';
import {usePropsValue} from '../../utils/use-props-value';

export type CheckboxGroupProps = {
  value?: CheckboxValue[];
  defaultValue?: CheckboxValue[];
  onChange?: (val: CheckboxValue[]) => void;
  children?: React.ReactNode;
};

const Group: React.FC<CheckboxGroupProps> = ({defaultValue = [], ...props}) => {
  const [value, setValue] = usePropsValue({
    defaultValue,
    ...props,
  });

  return (
    <CheckboxGroupContext.Provider
      value={{
        value: value,
        check: (v) => {
          setValue([...value, v]);
        },
        uncheck: (v) => {
          setValue(value.filter((item) => item !== v));
        },
      }}
    >
      {props.children}
    </CheckboxGroupContext.Provider>
  );
};

export default Group;
