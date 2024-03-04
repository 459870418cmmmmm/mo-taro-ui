import React from 'react';
import {View} from '@tarojs/components';
import classnames from '../../utils/classnames';
import './index.less';

export type TagType = 'solid' | 'outline';

export type TagProps = {
  className?: string;
  type?: TagType;
  closable?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  onClose?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: React.ReactNode;
};

const classPrefix = 'fps-tag';

const Tag: React.FC<TagProps> = ({
  className,
  type = 'solid',
  closable = true,
  onClick,
  onClose,
  children,
}) => {
  const tagClass = classnames(
    classPrefix,
    {
      [`${classPrefix}-${type}`]: type,
    },
    className
  );

  const handleClick = (e) => {
    e.stopPropagation();
    // @ts-ignore
    onClick?.();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    // @ts-ignore
    onClose?.();
  };

  return (
    <View className={tagClass} onClick={handleClick}>
      <View className={`${classPrefix}-content-wrapper`}>
        <View className={`${classPrefix}-content`}>{children}</View>
        {closable && (
          <View className={`${classPrefix}-close-icon`} onClick={handleClose}>
            <img
              src="https://cdn-cn.ff-svc.cn/production/Fps/Icons/icon-circle-close.svg"
              alt="close"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Tag;
