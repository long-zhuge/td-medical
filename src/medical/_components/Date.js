/*
* 类型：date
* 格式：YYYY-MM-DD
* */

import React from 'react';
import FormItem from 'td-antd/es/form-item';
import DateEasily from 'td-antd/es/date-easily';
import tools from 'td-antd/es/tools';

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
      normalize={date => date && tools.momentToString(date)}
      {...rest}
    >
      <DateEasily style={{ width: '100%' }} />
    </FormItem>
  );
}
