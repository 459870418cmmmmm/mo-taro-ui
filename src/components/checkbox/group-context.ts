import {createContext} from 'react';
import {CheckboxValue} from './checkbox';

export const CheckboxGroupContext = createContext<{
  value: CheckboxValue[];
  check: (val: CheckboxValue) => void;
  uncheck: (val: CheckboxValue) => void;
} | null>(null);
