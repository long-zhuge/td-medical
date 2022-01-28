/*
* 类型：number_double
* */

import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import { regExp } from '../../_util';

export default (props) => {
  const {
    label = '',
    name = '',
    name2 = '',
    rule,
    ruleMessage = '必填项',
    unit,
  } = props;

  return (
    <Form.Item label={label} required>
      <Row>
        <Col span={11}>
          <Form.Item
            name={name}
            rules={[
              {
                required: true,
                message: `${label}不为空`,
              }, {
                pattern: regExp(rule),
                message: ruleMessage,
              },
            ]}
          >
            <Input style={{ width: '100%-15px', textAlign: 'center' }} />
          </Form.Item>
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
        <Col span={11}>
          <Form.Item
            name={name2}
            rules={[
              {
                required: true,
                message: `${label}不为空`,
              }, {
                pattern: regExp(rule),
                message: ruleMessage,
              },
            ]}
          >
            <Input style={{ width: '100%-15px', textAlign: 'center' }} addonAfter={unit} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
}
