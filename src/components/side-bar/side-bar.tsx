import React from 'react';
import classnames from '../../utils/classnames';
import {usePropsValue} from '../../utils/use-props-value';
import {traverseReactNode} from '../../utils/traverse-react-node';
import SideBarItem from './side-bar-item';
import './index.less';

export type SideBarProps = {
  className?: string;
  activeKey?: string | null;
  defaultActiveKey?: string | null;
  onChange?: (val: string) => void;
  children?: React.ReactNode;
};

type CompoundedComponent = React.FC<SideBarProps> & {
  Item: typeof SideBarItem;
};

export type SideBarItemProps = {
  className?: string;
  title: string;
  children?: React.ReactNode;
};

const classPrefix = 'fps-side-bar';

const SideBar: CompoundedComponent = ({defaultActiveKey = null, ...props}) => {
  const keyToIndexRecord: Record<string, number> = {};
  const panes = [];
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

  const getSideBarItemClass = (key) =>
    classnames(
      `${classPrefix}-item`,
      {
        [`${classPrefix}-active`]: key === activeKey,
      },
      props.className
    );

  const handleTabClick = (key) => {
    setActiveKey(key);
  };

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-header`}>
        <div className={`${classPrefix}-list`}>
          {panes.map((tab: React.ReactElement) => (
            <div onClick={() => handleTabClick(tab.key)} className={getSideBarItemClass(tab.key)}>
              {tab.props.title}
            </div>
          ))}
        </div>
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

SideBar.Item = SideBarItem;

export default SideBar;
