import React, {useState, useRef, useEffect} from 'react';
import {useUpdateEffect} from 'ahooks';
import {nextTick} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {getRectByTaro} from '../../utils/get-rect';

import './index.less';

export type AnimateHeightProps = {
  height: string;
  duration?: number;
  children?: React.ReactNode;
};

const classPrefix = 'fps-animate-height';

const AnimateHeight: React.FC<AnimateHeightProps> = ({height, duration = 200, children}) => {
  const [contentHeight, setContentHeight] = useState('auto');
  const [wrapperHeight, setWrapperHeight] = useState('0px');
  const contentRef = useRef(null);

  useEffect(() => {
    const getHeight = async () => {
      if (contentRef.current) {
        const rect = await getRectByTaro(contentRef.current);
        setContentHeight(`${rect?.height}px`);
      }
    };
    nextTick(() => getHeight());
  }, [contentRef]);

  useUpdateEffect(() => {
    if (height === 'auto') {
      setWrapperHeight(contentHeight);
    } else {
      setWrapperHeight(height);
    }
  }, [height, contentHeight]);

  return (
    <View
      className={`${classPrefix}-wrapper`}
      style={{height: wrapperHeight, transition: `height ${duration}ms`}}
    >
      <View className={`${classPrefix}-content`} ref={contentRef}>
        {children}
      </View>
    </View>
  );
};

export default AnimateHeight;
