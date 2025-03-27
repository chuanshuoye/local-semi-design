import React from 'react';
import { Tag } from '@douyinfe/semi-ui';

export type StatusType = 'success' | 'warning' | 'danger' | 'default';

export interface StatusTagProps {
  status: StatusType;
  text: React.ReactNode;
}

const StatusTag: React.FC<StatusTagProps> = ({ status, text }) => {
  const colorMap: Record<StatusType, string> = {
    success: 'green',
    warning: 'orange',
    danger: 'red',
    default: 'grey'
  };

  return <Tag color={colorMap[status]}>{text}</Tag>;
};

export default StatusTag; 