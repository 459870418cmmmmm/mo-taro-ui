import React from 'react';
import classnames from '../../utils/classnames';
import {getNavBarInfo} from '../../utils/get-nav-bar-info';
import './index.less';

export type NavBarProps = {
  className?: string;
  leftIcon?: () => React.ReactNode;
  backgroundColor?: string;
  children?: React.ReactNode;
};

const classPrefix = 'fps-nav-bar';

const NavBar: React.FC<NavBarProps> = ({
  className,
  leftIcon,
  backgroundColor = '#fff',
  children,
}) => {
  const navBarClass = classnames(classPrefix, className);
  const {navBarHeight, statusBarHeight, pw} = getNavBarInfo();

  return (
    <div
      className={navBarClass}
      style={{
        height: `${navBarHeight}px`,
        paddingTop: `${statusBarHeight}px`,
        backgroundColor: backgroundColor,
      }}
    >
      {leftIcon?.() && (
        <div className={`${classPrefix}-left`} style={{left: `${pw}px`}}>
          {leftIcon?.()}
        </div>
      )}
      <div className={`${classPrefix}-title`}>{children}</div>
    </div>
  );
};

export default NavBar;
