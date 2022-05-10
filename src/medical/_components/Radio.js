/*
* 类型：radio
* PS：主要作用于评分组件
*   map：使用 / 分隔描述和评分；使用 # 分隔枚举值
* */

import React from 'react';
import { Radio } from 'antd';
import FormItem from 'td-antd/es/form-item';
import { toMap } from '../../_util';

export default (props) => {
  const {
    label = '',
    name = '',
    map = '',
    ...rest
  } = props;

  return (
    <FormItem
      label={label}
      name={name}
      {...rest}
    >
      <Radio.Group>
        {toMap(map).map(i => <Radio key={i} value={i}>{i}</Radio>)}
      </Radio.Group>
    </FormItem>
  );
}
