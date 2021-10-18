/*
* 类型：number
* */

import React from 'react';
import { Form, Input } from 'antd';
import { regExp } from '../_util';

export default (props) => {
  const {
    label = '',
    name = '',
    rule,
    ruleMessage = '必填项',
    unit,
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
        }, {
          pattern: regExp(rule),
          message: ruleMessage,
        },
      ]}
    >
      <Input type="number" style={{ width: '100%' }} addonAfter={unit} />
    </Form.Item>
  );
}
