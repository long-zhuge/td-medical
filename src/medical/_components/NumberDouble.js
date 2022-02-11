/*
* 类型：number_double
* */

import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import FormItem from 'td-antd/es/form-item';

export default (props) => {
  const {
    label = '',
    name = '',
    name2 = '',
    unit,
    ...rest
  } = props;

  return (
    <Form.Item label={label} required>
      <Row>
        <Col span={9}>
          <FormItem
            isNegative
            name={name}
            itemType="number"
            inputProps={{ style: { width: '100%-15px', textAlign: 'center' } }}
            {...rest}
          />
        </Col>
        <Col span={2}>
          <Input
            disabled
            value="/"
            style={{
              width: '100%',
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          />
        </Col>
        <Col span={13}>
          <FormItem
            isNegative
            name={name2}
            itemType="number"
            inputProps={{ addonAfter: unit, style: { width: '100%-15px', textAlign: 'center' } }}
            {...rest}
          />
        </Col>
      </Row>
    </Form.Item>
  );
}
