/*
* 类型：text
* */

import React from 'react';
import FormItem from 'td-antd/es/form-item';

export default (props) => {
  const {
    label = '',
    name = '',
    ...rest
  } = props;

  return (
    <FormItem
      label={label}
      name={name}
      inputProps={{ style: { width: '100%' } }}
      {...rest}
    />
  );
}
