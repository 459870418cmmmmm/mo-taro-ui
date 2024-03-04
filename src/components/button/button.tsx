import React, {useRef} from 'react';
import {Button} from '@tarojs/components';
import {ButtonProps as MiniProgramButtonProps} from '@tarojs/components/types/Button';
import classnames from '../../utils/classnames';
import './index.less';

export type Size = 'medium' | 'small';
export type Type = 'primary' | 'default' | 'cartier';
export type Fill = 'solid' | 'outline' | 'none';

type OmitButtonProps = Omit<MiniProgramButtonProps, 'size' | 'type'>;

export type FPSButtonProps = OmitButtonProps & {
  className?: string;
  size?: Size;
  type?: Type;
  fill?: Fill;
  children?: React.ReactNode;
};

const classPrefix = 'fps-button';

const FPSButton: React.FC<FPSButtonProps> = ({
  className,
  size = 'medium',
  type = 'primary',
  fill = 'solid',
  children,
  ...props
}) => {
  const nativeButtonRef = useRef<HTMLButtonElement>(null);

  const buttonClass = classnames(classPrefix, className, {
    [`${classPrefix}-${size}`]: size,
    [`${classPrefix}-${type}`]: type,
    [`${classPrefix}-fill-${fill}`]: fill,
  });

  return (
    <Button {...props} ref={nativeButtonRef} className={buttonClass}>
      {children}
    </Button>
  );
};

export default FPSButton;
