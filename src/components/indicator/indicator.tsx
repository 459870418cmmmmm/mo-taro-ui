import React from 'react';
import {View} from '@tarojs/components';
import classnames from '../../utils/classnames';
import './index.less';

export type IndicatorType = 'line' | 'dot' | 'groove' | 'grid';
export type IndicatorColor = 'black' | 'white' | 'red';

export type IndicatorProps = {
  className?: string;
  total: number;
  currentIndex: number;
  type?: IndicatorType;
  color?: IndicatorColor;
};

const classPrefix = 'fps-indicator';

const Indicator: React.FC<IndicatorProps> = ({
  className,
  total,
  currentIndex,
  type = 'dot',
  color = 'black',
}) => {
  if (!total) return null;

  const itemArray = new Array(total).fill('');

  return (
    <View
      className={classnames(className, classPrefix, {
        [`${classPrefix}-${type}`]: !!type,
        [`${classPrefix}-${color}`]: !!color,
      })}
    >
      {type === 'dot' || type === 'grid' ? (
        itemArray.map((_, index) => (
          <View
            key={index}
            className={classnames(`${classPrefix}-item`, {
              [`${classPrefix}-item-active`]: currentIndex === index,
            })}
          />
        ))
      ) : (
        <View
          className={`${classPrefix}-item-overall`}
          style={{width: `${100 / total}%`, transform: `translateX(${currentIndex * 100}%)`}}
        />
      )}
    </View>
  );
};

export default Indicator;
