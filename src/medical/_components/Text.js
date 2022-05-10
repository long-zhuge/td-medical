/*
* 类型：text
* */

import React from 'react';
import FormItem from 'td-antd/es/form-item';

const CONFIG = {
  text: { itemType: 'default' },
  textarea: { itemType: 'textarea' },
};

export default (props) => {
  const {
    label = '',
    name = '',
    inputType,
    ...rest
  } = props;

  return (
    <FormItem
      label={label}
      name={name}
      inputProps={{ style: { width: '100%' }, placeholder: rest.placeholder, rows: 1 }}
      {...CONFIG[inputType]}
      {...rest}
    />
  );
}
