/*
* 类型：radio
* */

import React from 'react';
import { Radio } from 'antd';
import FormItem from 'td-antd/es/form-item';

export default (props) => {
  const {
    label = '',
    name = '',
    map = [],
    ...rest
  } = props;

  return (
    <FormItem
      label={label}
      name={name}
      {...rest}
    >
      <Radio.Group>
        {map.map(i => <Radio key={i} value={i}>{i}</Radio>)}
      </Radio.Group>
    </FormItem>
  );
}
