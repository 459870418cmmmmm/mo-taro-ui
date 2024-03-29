import {createContext} from 'react';
import {RadioValue} from './radio';

export const RadioGroupContext = createContext<{
  value: RadioValue[];
  check: (val: RadioValue) => void;
  uncheck: (val: RadioValue) => void;
} | null>(null);
