/*
* 类型：select
*   map：使用 # 进行分隔
* */

import React from 'react';
import FormItem from 'td-antd/es/form-item';
import SelectList from 'td-antd/es/select-list';
import { toMap } from '../../_util';

export default (props) => {
  const {
    map,
    label = '',
    name = '',
    ...rest
  } = props;

  return (
    <FormItem
      label={label}
      name={name}
      {...rest}
    >
      <SelectList
        localData={toMap(map)}
        style={{ width: '100%' }}
        placeholder={rest.placeholder}
      />
    </FormItem>
  );
}
