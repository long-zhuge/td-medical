/*
* 类型：select
* */

import React from 'react';
import { Form } from 'antd';
import SelectMap from 'td-antd/es/select-map';
import { toMap } from '../_util';

export default (props) => {
  const {
    map,
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
      <SelectMap
        data={toMap(map)}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
}
