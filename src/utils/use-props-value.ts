import {useRef} from 'react';
import {useMemoizedFn, useUpdate} from 'ahooks';

type Options<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function usePropsValue<T>(options: Options<T>) {
  const {value, defaultValue, onChange} = options;
  const isControlled = value !== undefined;

  const update = useUpdate();
  const stateRef = useRef<T>(isControlled ? value : defaultValue);
  if (isControlled) {
    stateRef.current = value;
  }

  const setState = useMemoizedFn((v, forceTrigger = false) => {
    const nextValue = typeof v === 'function' ? stateRef.current : v;
    if (!forceTrigger && nextValue === stateRef.current) return;
    stateRef.current = nextValue;
    update();
    return onChange?.(nextValue);
  });

  return [stateRef.current, setState] as const;
}
