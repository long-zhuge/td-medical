/*
* 类型：hospitalDepartments
* */

import React, { useContext } from 'react';
import { Cascader } from 'antd';
import FormItem from 'td-antd/es/form-item';

import { EleContext } from '../index';

export default (props) => {
  const {
    label = '',
    name = '',
    ...rest
  } = props;

  const { dept } = useContext(EleContext);

  return (
    <FormItem
      label={label}
      name={name}
      {...rest}
    >
      <Cascader
        options={dept}
        fieldNames={{
          label: 'title',
          value: 'key',
        }}
      />
    </FormItem>
  );
}
