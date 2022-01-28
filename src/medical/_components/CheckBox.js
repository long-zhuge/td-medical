/*
* 类型：checkbox
* */

import React from 'react';
import { Form, Checkbox } from 'antd';

export default (props) => {
  const {
    label = '',
    name = '',
  } = props;

  return (
    <Form.Item
      label={label}
      name={name}
      valuePropName="checked"
      initialValue={false}
      rules={[
        {
          required: false,
          message: `${label}不为空`,
        },
      ]}
    >
      <Checkbox />
    </Form.Item>
  );
}
