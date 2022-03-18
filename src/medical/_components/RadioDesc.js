/*
* 类型：radio，附带说明输入框
* */

import React from 'react';
import { Radio, Row, Col } from 'antd';
import FormItem from 'td-antd/es/form-item';
import { toMap } from '../../_util';

export default (props) => {
  const {
    label = '',
    name = '',
    name2 = '',
    map = '',
    ...rest
  } = props;

  const mapList = toMap(map);

  return (
    <Row gutter={12}>
      <Col span={10}>
        <FormItem
          label={label}
          name={name}
          {...rest}
        >
          <Radio.Group>
            {toMap(map).map(i => <Radio key={i} value={i}>{i}</Radio>)}
          </Radio.Group>
        </FormItem>
      </Col>
      <FormItem noStyle shouldUpdate>
        {({ getFieldValue }) => {
          if (getFieldValue(name) === mapList[0]) {
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
