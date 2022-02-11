/*
* 类型：date
* 格式：YYYY-MM-DD
* */

import React from 'react';
import { Form } from 'antd';
import DateEasily from 'td-antd/es/date-easily';
import tools from 'td-antd/es/tools';

export default (props) => {
  const {
    label = '',
    name = '',
    placeholder = '',
  } = props;

  return (
    <Form.Item
      label={label}
      name={name}
      normalize={date => date && tools.momentToString(date)}
      rules={[
        {
          required: true,
          message: `${label}不为空`,
        },
      ]}
    >
      <DateEasily style={{ width: '100%' }} placeholder={placeholder} />
    </Form.Item>
  );
}