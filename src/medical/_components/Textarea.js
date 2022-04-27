/*
* 类型：textarea
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
      itemType="textarea"
      inputProps={{ rows: 2, placeholder: rest.placeholder }}
      {...rest}
    />
  );
}
