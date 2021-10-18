import React from 'react';
import { Button } from 'antd';
import { isMobile } from '../_util';

const Back = ({ url = '' }) => {
  const onBack = () => {
    url ? window.location = url : window.history.back();
  };

  if (!isMobile) {
    return <Button onClick={onBack}>返回</Button>
  }

  return null;
};

export default Back;
