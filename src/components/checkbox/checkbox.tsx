import React, {forwardRef, useImperativeHandle, useContext} from 'react';
import CheckboxGroup from './group';
import classnames from '../../utils/classnames';
import {usePropsValue} from '../../utils/use-props-value';
import {CheckboxGroupContext} from './group-context';
import './index.less';

export type CheckboxValue = string | number;

export type FPSCheckboxProps = {
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: CheckboxValue;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
};

export type CheckboxRef = {
  check: () => void;
  uncheck: () => void;
  toggle: () => void;
};

const classPrefix = 'fps-checkbox';

const FPSCheckbox = forwardRef<CheckboxRef, FPSCheckboxProps>(
  ({defaultChecked = false, ...props}, ref) => {
    let [checked, setChecked] = usePropsValue({
      value: props.checked,
      defaultValue: defaultChecked,
      ...props,
    });

    const groupContext = useContext(CheckboxGroupContext);

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

    const checkboxClass = classnames(classPrefix, props.className);

    const renderIcon = () => {
      return (
        <div className={`${classPrefix}-icon`}>
          <img
            src="https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-checkbox-unselected.svg"
            alt="unchecked"
          />
          {checked && (
            <img
              className={`${classPrefix}-icon-checked`}
              src="https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-checkbox-selected.svg"
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
      <div className={checkboxClass} onClick={handleCheck}>
        {renderIcon()}
        {props.children && <div className={`${classPrefix}-content`}>{props.children}</div>}
      </div>
    );
  }
);

// @ts-ignore
FPSCheckbox.Group = CheckboxGroup;

export default FPSCheckbox;
