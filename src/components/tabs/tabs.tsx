import React, {useState, useEffect, useMemo, useRef, createRef} from 'react';
import Taro from '@tarojs/taro';
import {ScrollView} from '@tarojs/components';
import classnames from '../../utils/classnames';
import {usePropsValue} from '../../utils/use-props-value';
import {traverseReactNode} from '../../utils/traverse-react-node';
import {getRectByTaro} from '../../utils/get-rect';
import Tab from './tab';
import './index.less';

export type Type = 'default' | 'underline' | 'circle';

export type TabsProps = {
  className?: string;
  activeKey?: string | null;
  defaultActiveKey?: string | null;
  type?: Type;
  showMask?: boolean;
  withAnimation?: boolean;
  tabId?: string;
  onChange?: (val: string) => void;
  children?: React.ReactNode;
};

type CompoundedComponent = React.FC<TabsProps> & {
  Tab: typeof Tab;
};

export type TabProps = {
  title?: React.ReactNode | string;
  disabled?: boolean;
  children?: React.ReactNode;
};

const classPrefix = 'fps-tabs';

const Tabs: CompoundedComponent = ({
  defaultActiveKey = null,
  showMask = false,
  withAnimation = false,
  type = 'default',
  ...props
}) => {
  const keyToIndexRecord: Record<string, number> = {};
  const panes = [];
  const [scroll, setScroll] = useState(0);
  const [circleWidth, setCircleWidth] = useState(0);
  const [circleHeight, setCircleHeight] = useState(0);
  const [circleLeft, setCircleLeft] = useState(0);

  let firstActiveKey: string | null;

  traverseReactNode(props.children, (child, index) => {
    if (!React.isValidElement(child)) return;
    const key = child.key;
    if (typeof key !== 'string') return;
    if (index === 0) {
      firstActiveKey = key;
    }
    const length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });

  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: defaultActiveKey ?? firstActiveKey,
    onChange: (v) => {
      if (v === null) return;
      props.onChange?.(v);
    },
  });

  // TODO: Taro 暂时不支持 tabsRef.current.scrollOffset()
  const tabsRef = useRef(null);
  const refs: React.RefObject<any>[] = useMemo(
    () =>
      panes.reduce(
        (prev, current) => Object.assign(prev, {[`tab-${current.key}`]: createRef()}),
        {}
      ),
    [panes]
  );

  const tabsClass = classnames(classPrefix, props.className);

  const getTabItemClass = (key, disabled) =>
    classnames(`${classPrefix}-item`, {
      [`${classPrefix}-active`]: key === activeKey,
      [`${classPrefix}-disabled`]: disabled,
    });

  const getScrollLeft = (rect) => {
    const {windowWidth} = Taro.getSystemInfoSync();
    const halfScreenWidth = windowWidth / 2;
    const halfItemWidth = rect.width / 2;
    const scrollDistance = rect.left - halfScreenWidth;
    const total = scrollDistance + halfItemWidth;
    return total;
  };

  const getTabInfo = async (key) => {
    const ref = refs[`tab-${key}`];
    if (tabsRef.current && ref.current) {
      const rect = await getRectByTaro(ref.current);
      const query = Taro.createSelectorQuery();
      query.select(`#${props.tabId}`).scrollOffset();
      query.exec((res) => {
        const {scrollLeft} = res[0];
        const scrollLength = getScrollLeft(rect) + scrollLeft;
        setScroll(scrollLength);
        if (type === 'circle') {
          setCircleLeft(rect.left + scrollLeft);
          setCircleWidth(rect.width);
          setCircleHeight(rect.height);
        }
      });
    }
  };

  const handleTabClick = (key, disabled) => {
    if (!disabled) {
      setActiveKey(key);
      if (withAnimation) {
        getTabInfo(key);
      }
    }
  };

  const tabs = panes.map((tab: React.ReactElement) => {
    return (
      <div
        ref={refs[`tab-${tab.key}`]}
        id={`tab-${tab.key}`}
        onClick={() => handleTabClick(tab.key, tab.props.disabled)}
        className={getTabItemClass(tab.key, tab.props.disabled)}
      >
        {tab.props.title}
      </div>
    );
  });

  useEffect(() => {
    if (withAnimation) {
      getTabInfo(activeKey);
    }
  }, []);

  return (
    <div className={tabsClass}>
      <div className={`${classPrefix}-header`}>
        {showMask && (
          <>
            <div className={`${classPrefix}-header-mask ${classPrefix}-header-mask-left`} />
            <div className={`${classPrefix}-header-mask ${classPrefix}-header-mask-right`} />
          </>
        )}
        {withAnimation ? (
          <ScrollView
            ref={tabsRef}
            id={props.tabId}
            className={classnames(`${classPrefix}-list`, `${classPrefix}-scroll`, {
              [`${classPrefix}-circle`]: type === 'circle',
            })}
            scrollWithAnimation
            scrollX
            scrollLeft={scroll}
          >
            {tabs}
            <div
              className={`${classPrefix}-active-circle`}
              style={{
                width: circleWidth,
                left: circleLeft,
                height: circleHeight,
                borderRadius: circleHeight / 2,
              }}
            ></div>
          </ScrollView>
        ) : (
          <div
            className={classnames(`${classPrefix}-list`, {
              [`${classPrefix}-${type}`]: type !== 'circle',
            })}
          >
            {tabs}
          </div>
        )}
      </div>
      <div className={`${classPrefix}-content`}>
        {panes.map((tab: React.ReactElement) => {
          if (tab.key === activeKey) {
            return <div>{tab.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

Tabs.Tab = Tab;

export default Tabs;
