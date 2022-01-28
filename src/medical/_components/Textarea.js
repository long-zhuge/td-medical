/*
* 类型：textarea
* */

import React from 'react';
import { Form, Input } from 'antd';

export default (props) => {
  const {
    label = '',
    name = '',
  } = props;

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: true,
          message: `${label}不为空`,
        },
      ]}
    >
      <Input.TextArea rows={2} />
    </Form.Item>
  );
}
