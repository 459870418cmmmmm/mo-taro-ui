import React from 'react';
import {View} from '@tarojs/components';
import {ViewProps} from '@tarojs/components/types/View';
import {getNavBarInfo} from '../../utils/get-nav-bar-info';
import './index.less';

export type ContentViewProps = ViewProps & {
  safeFooter?: boolean;
  withDefaultPaddingTop?: boolean;
  extraPaddingTop?: number;
  paddingBot?: number;
  children?: React.ReactNode;
};

export const classPrefix = 'fps-content-view';

const ContentView: React.FC<ContentViewProps> = ({
  safeFooter = true,
  withDefaultPaddingTop = true,
  extraPaddingTop = 0,
  paddingBot = 0,
  children,
  ...props
}) => {
  const getStyle = () => {
    const {isIphoneXOrNewer, navBarHeight, statusBarHeight} = getNavBarInfo();
    const height = withDefaultPaddingTop ? navBarHeight + statusBarHeight : 0;

    if (safeFooter && isIphoneXOrNewer) {
      return {paddingTop: height + extraPaddingTop, paddingBottom: 24 + paddingBot};
    }
    return {paddingTop: height + extraPaddingTop, paddingBottom: paddingBot};
  };

  return (
    <View {...props} className={classPrefix} style={getStyle()}>
      {children}
    </View>
  );
};

export default ContentView;
