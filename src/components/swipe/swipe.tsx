import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import {nextTick} from '@tarojs/taro';
import {View, MovableView, MovableArea} from '@tarojs/components';
import classnames from '../../utils/classnames';
import {getNavBarInfo} from '../../utils/get-nav-bar-info';
import {getRectByTaro} from '../../utils/get-rect';

import './index.less';

export type SwipeRef = {
  open: () => void;
  close: () => void;
};

export type SwipeProps = {
  className?: string;
  rightAction?: React.ReactNode;
  onOpen?: () => void;
  children?: React.ReactNode;
};

const classPrefix = 'fps-swipe';

const Swipe = forwardRef<SwipeRef, SwipeProps>(
  ({className, rightAction, onOpen, children}, ref) => {
    const contentRef = useRef(null);
    const operationRef = useRef(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [x, setX] = useState(0);
    const [operationVisible, setOperationVisible] = useState(false);
    const [contentHeight, setContentHeight] = useState('auto');
    const [operationWidth, setOperationWidth] = useState('auto');
    const {windowWidth} = getNavBarInfo();

    const swipeWrapperClass = classnames(classPrefix, className);

    const handleTouchStart = (e) => {
      const {clientX, clientY} = e.touches[0];
      setStartX(clientX);
      setStartY(clientY);
    };

    const handleTouchEnd = (e) => {
      const {clientX, clientY} = e.changedTouches[0];

      // 处理上下滑动误触左右滑动的情况
      if (Math.abs(clientY - startY) > 50) return;
      const direction = clientX - startX;

      // 处理非滑动或点击时误触发的情况
      if (direction < -1) {
        !operationVisible && showOperations();
      } else if (direction > 1) {
        operationVisible && hideOperations();
      }
    };

    const showOperations = () => {
      setX(-operationWidth);
      setOperationVisible(true);
      onOpen?.();
    };

    const hideOperations = () => {
      setX(0);
      setOperationVisible(false);
    };

    useImperativeHandle(ref, () => ({
      open: () => showOperations(),
      close: () => hideOperations(),
    }));

    useEffect(() => {
      const getHeight = async () => {
        if (contentRef.current) {
          const rect = await getRectByTaro(contentRef.current);
          setContentHeight(rect?.height);
        }
      };
      nextTick(() => getHeight());
    }, [contentRef]);

    useEffect(() => {
      const getWidth = async () => {
        if (operationRef.current) {
          const rect = await getRectByTaro(operationRef.current);
          setOperationWidth(rect?.width);
        }
      };
      nextTick(() => getWidth());
    }, [operationRef]);

    return (
      <View className={swipeWrapperClass}>
        <MovableArea
          className={`${classPrefix}-area`}
          style={{
            width: windowWidth - (operationWidth as unknown as number),
            height: contentHeight,
          }}
        >
          <MovableView
            className={`${classPrefix}-view`}
            style={{width: windowWidth, height: contentHeight, transition: 'ease 0.2s'}}
            direction="horizontal"
            outOfBounds
            friction={150}
            x={x}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <View
              className={`${classPrefix}-content`}
              ref={contentRef}
              style={{width: windowWidth, height: contentHeight}}
            >
              {children}
            </View>
          </MovableView>
        </MovableArea>
        <View className={`${classPrefix}-operation`} ref={operationRef}>
          {rightAction}
        </View>
      </View>
    );
  }
);

Swipe.displayName = 'FPSSwipe';

export default Swipe;
