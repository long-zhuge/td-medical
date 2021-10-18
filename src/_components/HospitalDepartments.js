/*
* 类型：hospitalDepartments
* */

import React, { useContext } from 'react';
import { Form, TreeSelect } from 'antd';

import { EleContext } from '../form';

export default (props) => {
  const {
    label = '',
    name = '',
  } = props;

  const { dept } = useContext(EleContext);

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
      <TreeSelect treeData={dept} />
    </Form.Item>
  );
}
