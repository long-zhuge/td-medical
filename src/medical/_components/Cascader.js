/*
* 类型：Cascader
* */

import React, { useContext } from 'react';
import { Cascader } from 'antd';
import FormItem from 'td-antd/es/form-item';

import { EleContext } from '../index';

export default (props) => {
  const {
    label = '',
    name = '',
    enName,
    ...rest
  } = props;

  const { dept, region } = useContext(EleContext);
  const params = {
    'region': {
      options: region,
    },
    'hospitalDepartments': {
      options: dept,
      fieldNames: {
        label: 'title',
        value: 'key',
      },
    },
  }[enName] || {};

  return (
    <FormItem
      label={label}
      name={name}
      {...rest}
    >
      <Cascader {...params} />
    </FormItem>
  );
}
