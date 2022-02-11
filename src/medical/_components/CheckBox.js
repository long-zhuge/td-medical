/*
* 类型：checkbox
* */

import React from 'react';
import { Checkbox } from 'antd';
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
      valuePropName="checked"
      initialValue={false}
      {...rest}
    >
      <Checkbox />
    </FormItem>
  );
}
