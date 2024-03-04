import React from 'react';
import {RootPortal, View} from '@tarojs/components';
import classnames from '../../utils/classnames';
import {getNavBarInfo} from '../../utils/get-nav-bar-info';
import './index.less';

export type Position = 'left' | 'right';

export type DrawerProps = {
  className?: string;
  isOpen: boolean;
  width?: string;
  position?: Position;
  showCloseIcon?: boolean;
  onClose?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: React.ReactNode;
};

const classPrefix = 'fps-drawer';

const Drawer: React.FC<DrawerProps> = ({
  className,
  isOpen,
  width = '150px',
  position = 'left',
  showCloseIcon = true,
  onClose,
  children,
}) => {
  const drawerContainerClass = classnames(`${classPrefix}-container`, {
    [`${classPrefix}-container-open`]: isOpen,
  });

  const drawerClass = classnames(className, classPrefix, {
    [`${classPrefix}-${position}`]: position,
  });

  const {navBarHeight, statusBarHeight} = getNavBarInfo();
  const height = navBarHeight + statusBarHeight;

  const getDrawerStyle = (position, width, height) => {
    return {top: `${height}px`, width, height: `calc(100% - ${height}px)`};
  };

  const getMaskStyle = (position, width, height) => {
    return {top: `${height}px`, height: `calc(100% - ${height}px)`};
  };

  const handleClose = (e) => {
    e.stopPropagation();
    // @ts-ignore
    onClose?.();
  };

  return (
    <RootPortal>
      <View className={drawerContainerClass}>
        <View
          className={`${classPrefix}-mask`}
          catchMove
          style={getMaskStyle(position, width, height)}
          onClick={handleClose}
        >
          <View
            className={drawerClass}
            style={getDrawerStyle(position, width, height)}
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

export default Drawer;
