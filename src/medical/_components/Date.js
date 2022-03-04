/*
* 类型：date、datetime
* 格式：YYYY-MM-DD、YYYY-MM-DD hh:mm:ss
* */

import React from 'react';
import FormItem from 'td-antd/es/form-item';
import DateEasily from 'td-antd/es/date-easily';
import tools from 'td-antd/es/tools';

const DATE_CONFIG = {
  month: { picker: 'month', format: 'YYYY-MM' },
  date: { picker: 'date', format: 'YYYY-MM-DD' },
  datetime: { picker: 'date', format: 'YYYY-MM-DD HH:mm:ss', showTime: true },
};

export default (props) => {
  const {
    label = '',
    name = '',
    inputType,
    ...rest
  } = props;

  const normalize = date => date && tools.momentToString(date, DATE_CONFIG[inputType].format);

  return (
    <FormItem
      label={label}
      name={name}
      normalize={normalize}
      {...rest}
    >
      <DateEasily style={{ width: '100%' }} placeholder={rest.placeholder} {...DATE_CONFIG[inputType]} />
    </FormItem>
  );
}
