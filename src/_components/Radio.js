/*
* 类型：radio
* */

import React from 'react';
import { Form, Radio } from 'antd';

export default (props) => {
  const {
    label = '',
    name = '',
    map = [],
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
      <Radio.Group>
        {map.map(i => <Radio value={i}>{i}</Radio>)}
      </Radio.Group>
    </Form.Item>
  );
}
