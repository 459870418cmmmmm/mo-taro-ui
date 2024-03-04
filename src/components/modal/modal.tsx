import React from 'react';
import {RootPortal, View} from '@tarojs/components';
import classnames from '../../utils/classnames';
import './index.less';

export type ModalProps = {
  className?: string;
  isOpen: boolean;
  width?: string;
  maxHeight?: string;
  showCloseIcon?: boolean;
  onClose?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: React.ReactNode;
};

const classPrefix = 'fps-modal';

const Modal: React.FC<ModalProps> = ({
  className,
  isOpen,
  width = '300px',
  maxHeight,
  showCloseIcon = true,
  onClose,
  children,
}) => {
  const modalContainerClass = classnames(
    `${classPrefix}-container`,
    {
      [`${classPrefix}-container-open`]: isOpen,
    },
    className
  );

  const modalClass = classnames(classPrefix);

  const getModalStyle = (width, maxHeight) => {
    return {width, maxHeight};
  };

  const handleClose = (e) => {
    e.stopPropagation();
    // @ts-ignore
    onClose?.();
  };

  return (
    <RootPortal>
      <View className={modalContainerClass}>
        <View className={`${classPrefix}-mask`} catchMove onClick={handleClose}>
          <View
            className={modalClass}
            style={getModalStyle(width, maxHeight)}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseIcon && (
              <View className={`${classPrefix}-close-icon`} onClick={handleClose}>
                <img
                  src="https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-close.svg"
                  alt="close"
                />
              </View>
            )}
            {children}
          </View>
        </View>
      </View>
    </RootPortal>
  );
};

export default Modal;
