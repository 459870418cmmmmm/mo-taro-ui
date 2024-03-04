import React, {forwardRef, useImperativeHandle, useContext} from 'react';
import RadioGroup from './group';
import classnames from '../../utils/classnames';
import {usePropsValue} from '../../utils/use-props-value';
import {RadioGroupContext} from './group-context';
import './index.less';

export type RadioValue = string | number;

export type FPSRadioProps = {
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: RadioValue;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
};

export type RadioRef = {
  check: () => void;
  uncheck: () => void;
  toggle: () => void;
};

const classPrefix = 'fps-radio';

const FPSRadio = forwardRef<RadioRef, FPSRadioProps>(({defaultChecked = false, ...props}, ref) => {
  let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: defaultChecked,
    ...props,
  });

  const groupContext = useContext(RadioGroupContext);

  if (groupContext && props.value !== undefined) {
    checked = groupContext.value.includes(props.value);
    setChecked = (checked) => {
      if (checked) {
        groupContext.check(props.value);
      } else {
        groupContext.uncheck(props.value);
      }
      props.onChange?.(checked);
    };
  }

  const radioClass = classnames(classPrefix, props.className);

  const renderIcon = () => {
    return (
      <div className={`${classPrefix}-icon`}>
        <img
          src="https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-radio-unselected.svg"
          alt="unchecked"
        />
        {checked && (
          <img
            className={`${classPrefix}-icon-checked`}
            src="https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-radio-selected.svg"
            alt="checked"
          />
        )}
      </div>
    );
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  useImperativeHandle(ref, () => ({
    check: () => {
      setChecked(true);
    },
    uncheck: () => {
      setChecked(false);
    },
    toggle: () => {
      setChecked(!checked);
    },
  }));

  return (
    <div className={radioClass} onClick={handleCheck}>
      {renderIcon()}
      {props.children && <div className={`${classPrefix}-content`}>{props.children}</div>}
    </div>
  );
});

// @ts-ignore
FPSRadio.Group = RadioGroup;

export default FPSRadio;
