/*
* 类型：number
* */

import React from 'react';
import FormItem from 'td-antd/es/form-item';

export default (props) => {
  const {
    label = '',
    name = '',
    unit,
    ...rest
  } = props;

  return (
    <FormItem
      label={label}
      name={name}
      isNegative
      itemType="number"
      inputProps={{ addonAfter: unit, style: { width: '100%' } }}
      {...rest}
    />
  );
}
