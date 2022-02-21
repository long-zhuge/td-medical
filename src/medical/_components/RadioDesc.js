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

  return (
    <Row gutter={12}>
      <Col span={12}>
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
      <Col span={12}>
        <FormItem
          name={name2}
          {...rest}
        />
      </Col>
    </Row>
  );
}
