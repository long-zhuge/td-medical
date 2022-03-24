/*
* 类型：region
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

  const { region } = useContext(EleContext);

  return (
    <FormItem
      label={label}
      name={name}
      {...rest}
    >
      <Cascader options={region} />
    </FormItem>
  );
}
