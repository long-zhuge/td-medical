/*
* 类型：select
*   map：使用 # 进行分隔
* */

import React from 'react';
import FormItem from 'td-antd/es/form-item';
import SelectList from 'td-antd/es/select-list';
import { toMap } from '../../_util';

const CONFIG = {
  select: { mode: null },
  select_multiple: { mode: 'multiple' },
};

export default (props) => {
  const {
    label = '',
    name = '',
    name2 = '',
    map = '',
    linkage = '',
    inputType,
    ...rest
  } = props;

  const validate = (values = '') => {
    let arr;
    const linkageList = toMap(linkage);
    try {
      arr = values.split(',');
    } catch (e) {
      arr = values;
    }

    return arr.some(i => linkageList.includes(i));
  };

  return (
    <>
      <FormItem
        label={label}
        name={name}
        {...rest}
      >
        <SelectList
          {...CONFIG[inputType]}
          localData={toMap(map)}
          style={{ width: '100%' }}
          placeholder={rest.placeholder}
        />
      </FormItem>
      <FormItem.Update names={[name]}>
        {(res) => {
          if (validate(res[name])) {
            return (
              <FormItem
                name={name2}
                inputProps={{ placeholder: `请填写${label}` }}
              />
            );
          }
        }}
      </FormItem.Update>
    </>
  );
}
