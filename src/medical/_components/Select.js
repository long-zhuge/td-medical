/*
* 类型：select
* */

import React from 'react';
import { Form } from 'antd';
import SelectList from 'td-antd/es/select-list';
import { toMap } from '../../_util';

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
      <SelectList
        localData={toMap(map)}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
}
