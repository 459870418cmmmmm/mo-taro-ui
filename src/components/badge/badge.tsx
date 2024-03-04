import React from 'react';
import classnames from '../../utils/classnames';
import './index.less';

export type BadgeProps = {
  className?: string;
  content?: React.ReactNode;
  isDot?: boolean;
  color?: string;
  children?: React.ReactNode;
};

const classPrefix = 'fps-badge';

const Badge: React.FC<BadgeProps> = ({className, content, isDot, color = '#c10016', children}) => {
  const badgeClass = classnames(className, classPrefix, {
    [`${classPrefix}-dot`]: isDot,
  });

  const badge = () =>
    content || content === 0 ? (
      <div className={badgeClass} style={{background: color}}>
        {!isDot && <div className={`${classPrefix}-content`}>{content}</div>}
      </div>
    ) : null;

  return (
    <div className={`${classPrefix}-wrapper`}>
      {children}
      {badge()}
    </div>
  );
};

export default Badge;
