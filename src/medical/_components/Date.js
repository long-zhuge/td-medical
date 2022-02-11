/*
* 类型：date、datetime
* 格式：YYYY-MM-DD、YYYY-MM-DD hh:mm:ss
* */

import React from 'react';
import FormItem from 'td-antd/es/form-item';
import DateEasily from 'td-antd/es/date-easily';
import tools from 'td-antd/es/tools';

export default (props) => {
  const {
    label = '',
    name = '',
    inputType,
    ...rest
  } = props;

  const normalize = date => date && tools.momentToString(date, inputType === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss');

  return (
    <FormItem
      label={label}
      name={name}
      normalize={normalize}
      {...rest}
    >
      <DateEasily style={{ width: '100%' }} placeholder={rest.placeholder} showTime={inputType === 'datetime'} />
    </FormItem>
  );
}
