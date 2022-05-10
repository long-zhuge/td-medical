/*
* 类型：select_desc
*   map：使用 # 进行分隔
*   linkage：与 map 进行联动的关键词。可使用 # 进行分隔设置多个词
* */

import React from 'react';
import { Row, Col } from 'antd';
import FormItem from 'td-antd/es/form-item';
import SelectList from 'td-antd/es/select-list';
import { toMap } from '../../_util';

export default (props) => {
  const {
    label = '',
    name = '',
    name2 = '',
    map = '',
    linkage = '',
    ...rest
  } = props;

  return (
    <Row gutter={12}>
      <Col span={10}>
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
      </Col>
      <FormItem noStyle shouldUpdate>
        {({ getFieldValue }) => {
          if (toMap(linkage).includes(getFieldValue(name))) {
            return (
              <Col span={14}>
                <FormItem
                  name={name2}
                  inputProps={{ placeholder: `请填写${label}` }}
                />
              </Col>
            );
          }
        }}
      </FormItem>
    </Row>
  );
}
