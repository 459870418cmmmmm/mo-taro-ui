import React from 'react';
import {RootPortal, View} from '@tarojs/components';
import classnames from '../../utils/classnames';
import {getNavBarInfo} from '../../utils/get-nav-bar-info';
import './index.less';

export type PopupProps = {
  className?: string;
  isOpen: boolean;
  fullscreen?: boolean;
  height?: string;
  showCloseIcon?: boolean;
  onClose?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: React.ReactNode;
};

const classPrefix = 'fps-popup';

const Popup: React.FC<PopupProps> = ({
  className,
  isOpen,
  fullscreen,
  height,
  showCloseIcon = true,
  onClose,
  children,
}) => {
  const popupContainerClass = classnames(
    `${classPrefix}-container`,
    {
      [`${classPrefix}-container-open`]: isOpen,
    },
    className
  );

  const {navBarHeight, statusBarHeight, isIphoneXOrNewer} = getNavBarInfo();
  const topHeight = navBarHeight + statusBarHeight;

  const popupClass = classnames(classPrefix, {
    [`${classPrefix}-iphone-x`]: isIphoneXOrNewer,
  });

  const getPopupStyle = (topHeight) => {
    if (fullscreen) {
      return {width: '100%', height: `calc(100% - ${topHeight}px)`};
    }
    if (height) {
      return {width: '100%', height};
    }
    return {width: '100%'};
  };

  const handleClose = (e) => {
    e.stopPropagation();
    // @ts-ignore
    onClose?.();
  };

  return (
    <RootPortal>
      <View className={popupContainerClass}>
        <View className={`${classPrefix}-mask`} catchMove onClick={handleClose}>
          <View
            className={popupClass}
            style={getPopupStyle(topHeight)}
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

export default Popup;
