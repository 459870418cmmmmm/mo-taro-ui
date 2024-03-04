import React from 'react';
import {View} from '@tarojs/components';
import AnimateHeight from '../animate-height';
import classnames from '../../utils/classnames';
import {usePropsValue} from '../../utils/use-props-value';
import {traverseReactNode} from '../../utils/traverse-react-node';
import Panel from './panel';
import './index.less';

type keyType = Array<string> | string | null;

export type CollapseProps = {
  className?: string;
  accordion?: boolean;
  activeKey?: keyType;
  defaultActiveKey?: keyType;
  onChange?: (val: string) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

type CompoundedComponent = React.FC<CollapseProps> & {
  Panel: typeof Panel;
};

export type PanelProps = {
  title: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: React.ReactNode;
};

const classPrefix = 'fps-collapse';

const Collapse: CompoundedComponent = ({defaultActiveKey = null, accordion = false, ...props}) => {
  const panels = [];

  traverseReactNode(props.children, (child) => {
    if (!React.isValidElement(child)) return;
    const key = child.key;
    if (typeof key !== 'string') return;
    panels.push(child);
  });

  const [activeKey, setActiveKey] = usePropsValue(
    // @ts-ignore
    accordion
      ? {
          value:
            props.activeKey === undefined
              ? undefined
              : props.activeKey === null
              ? []
              : [props.activeKey],
          defaultValue:
            defaultActiveKey === undefined || defaultActiveKey === null ? [] : [defaultActiveKey],
          onChange: (v) => {
            props.onChange?.(v[0] ?? null);
          },
        }
      : {
          value: props.activeKey,
          defaultValue: defaultActiveKey ?? [],
          onChange: props.onChange,
        }
  );

  const activeKeyList =
    activeKey === null ? [] : Array.isArray(activeKey) ? activeKey : [activeKey];

  const handleClick = (e, panel) => {
    const key = panel.key as string;
    const active = activeKeyList.includes(key);
    if (accordion) {
      if (active) {
        setActiveKey([]);
      } else {
        setActiveKey([key]);
      }
    } else {
      if (active) {
        setActiveKey(activeKeyList.filter((v) => v !== key));
      } else {
        setActiveKey([...activeKeyList, key]);
      }
    }

    panel.props.onClick?.(e);
  };

  const collapseClass = classnames(classPrefix, props.className);

  return (
    // @ts-ignore
    <View class={collapseClass}>
      {panels.map((panel: React.ReactElement) => {
        // @ts-ignore: TS2345
        const isPanelOpen = activeKeyList.includes(panel?.key);
        return (
          // @ts-ignore
          <View class={`${classPrefix}-panel-wrapper`}>
            <View className={`${classPrefix}-panel-title`} onClick={(e) => handleClick(e, panel)}>
              <View className={`${classPrefix}-panel-title-text`}>{panel.props.title}</View>
              <View>
                {props.icon ? (
                  props.icon
                ) : (
                  <div className="icon-wrapper">
                    <img
                      src="https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-dropdown-arrow.svg"
                      className={isPanelOpen ? 'icon animation' : 'icon animation-back'}
                      alt="icon"
                    />
                  </div>
                )}
              </View>
            </View>
            <AnimateHeight height={isPanelOpen ? 'auto' : '0px'}>
              <View className={`${classPrefix}-panel-content`}>{panel.props.children}</View>
            </AnimateHeight>
          </View>
        );
      })}
    </View>
  );
};

Collapse.Panel = Panel;

export default Collapse;
