/*
* 基础组件，适用于平铺的表单字段，如：姓名、性别、病历号...
* */

import React from 'react';
import { Row, Col } from 'antd';
import { getFormName, isMobile } from '../_util';

import FormBox from './FormBox';

// 表单组件
import Text from '../_components/Text';
import Date from '../_components/Date';
import Number from '../_components/Number';
import Select from '../_components/Select';
import DateTime from '../_components/DateTime';
import Textarea from '../_components/Textarea';
import NumberDouble from '../_components/NumberDouble';
import HospitalDepartments from '../_components/HospitalDepartments';

const ele = {
  text: Text,
  date: Date,
  number: Number,
  number_double: NumberDouble,
  datetime: DateTime,
  select: Select,
  textarea: Textarea,
  hospital_departments: HospitalDepartments,
};

const Base = (props) => {
  const {
    index = 0,
    fieldList = [],
  } = props;

  return (
    <FormBox {...props}>
      <Row gutter={!isMobile && [16, 0]}>
        {fieldList.map(item => {
          const Component = ele[item.inputType];
          const names = getFormName(item.valueToName, index);

          return (
            <Col span={isMobile ? 24 : 12}>
              <Component
                {...item}
                label={item.cn}
                name={names[0]}
                name2={names[1]}
              />
            </Col>
          )
        })}
      </Row>
    </FormBox>
  );
};

export default Base;
