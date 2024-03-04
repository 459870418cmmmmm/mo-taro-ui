import React from 'react';
import TabBarItem from './tab-bar-item';
import classnames from '../../utils/classnames';
import {getNavBarInfo} from '../../utils/get-nav-bar-info';
import './index.less';

export type TabBarProps = {
  className?: string;
  tabList?: TabBarItemProps[];
  children?: React.ReactNode;
};

type CompoundedComponent = React.FC<TabBarProps> & {
  Item: typeof TabBarItem;
};

export type TabBarItemProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: React.ReactNode;
};

export const classPrefix = 'fps-tab-bar';

const TabBar: CompoundedComponent = ({className, tabList, children}) => {
  const {isIphoneXOrNewer} = getNavBarInfo();
  const tabBarClass = classnames(classPrefix, className, {
    [`${classPrefix}-iphone-x`]: isIphoneXOrNewer,
  });
  const getTabBarItemClass = (itemClass) => classnames(`${classPrefix}-item`, itemClass);

  if (tabList) {
    return (
      <div className={tabBarClass}>
        {tabList.map((item, index) => (
          <div className={getTabBarItemClass(item?.className)} key={index} onClick={item?.onClick}>
            {item?.children}
          </div>
        ))}
      </div>
    );
  }
  return <div className={tabBarClass}>{children}</div>;
};

TabBar.Item = TabBarItem;

export default TabBar;
