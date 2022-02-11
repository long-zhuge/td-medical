/*
* 类型：textarea
* */

import React from 'react';
import { Input } from 'antd';
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
      {...rest}
    >
      <Input.TextArea rows={2} placeholder={rest.placeholder} />
    </FormItem>
  );
}
