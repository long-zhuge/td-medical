import React from 'react';
import { Button } from 'antd';
import redirect from 'td-antd/es/redirect';
import { isMobile } from '../_util';

const Back = ({ url = '' }) => {
  const onBack = () => {
    if (url) {
      redirect(url);
    } else {
      window.history.back();
    }
  };

  if (!isMobile) {
    return <Button onClick={onBack}>返回</Button>
  }

  return null;
};

export default Back;
