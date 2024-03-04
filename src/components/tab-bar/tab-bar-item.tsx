import React from 'react';
import classnames from '../../utils/classnames';
import {classPrefix} from './tab-bar';
import type {TabBarItemProps} from './tab-bar';

const TabBarItem: React.FC<TabBarItemProps> = ({className, onClick, children}) => {
  const tabBarItemClass = classnames(`${classPrefix}-item`, className);

  return (
    <div className={tabBarItemClass} onClick={onClick}>
      {children}
    </div>
  );
};
export default TabBarItem;
