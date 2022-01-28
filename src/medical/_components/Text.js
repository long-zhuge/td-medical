/*
* 类型：text
* */

import React from 'react';
import { Form, Input } from 'antd';

export default (props) => {
  const {
    label = '',
    name = '',
    required = true,
    message = `${label}不为空`,
  } = props;

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required,
          message,
        },
      ]}
    >
      <Input style={{ width: '100%' }} />
    </Form.Item>
  );
}
