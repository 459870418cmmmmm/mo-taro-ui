import React from 'react';
import {View} from '@tarojs/components';
import {ViewProps} from '@tarojs/components/types/View';
import classnames from '../../utils/classnames';
import {getNavBarInfo} from '../../utils/get-nav-bar-info';
import './index.less';

export type PageViewProps = ViewProps & {
  safeFooter?: boolean;
  safeFooterClass?: string;
  children?: React.ReactNode;
};

export const classPrefix = 'fps-page-view';

const PageView: React.FC<PageViewProps> = ({
  safeFooter = true,
  safeFooterClass,
  children,
  ...props
}) => {
  const footerClass = classnames('fps-page-view-safe-footer', safeFooterClass);
  const {isIphoneXOrNewer} = getNavBarInfo();

  return (
    <View {...props}>
      {children}
      {safeFooter && isIphoneXOrNewer && <div className={footerClass} style={{height: 24}} />}
    </View>
  );
};

export default PageView;
