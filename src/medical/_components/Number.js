/*
* 类型：number、number_unit
* */

import React from 'react';
import { Select, Input } from 'antd';
import FormItem from 'td-antd/es/form-item';
import { toMap } from '../../_util';

export default (props) => {
  const {
    label = '',
    name = '',
    name2 = '',
    map = '',
    unit,
    inputType,
    required = false,
    ...rest
  } = props;

  return (
    <FormItem label={label} required={required}>
      <Input.Group compact>
        <FormItem
          name={name}
          isNegative
          itemType="number"
          inputProps={{ addonAfter: unit, style: { width: '100%' } }}
          required={required}
          {...rest}
        />
        <FormItem noStyle shouldUpdate show={inputType === 'number_unit'}>
          {({ getFieldValue }) => {
            const value = getFieldValue(name);

            return (
              <FormItem name={name2} required={!!value || required}>
                <Select style={{ minWidth: 100 }}>
                  {toMap(map).map(i => <Select.Option key={i}>{i}</Select.Option>)}
                </Select>
              </FormItem>
            );
          }}
        </FormItem>
      </Input.Group>
    </FormItem>
  );
}
