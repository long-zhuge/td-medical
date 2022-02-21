/*
* 基础组件，适用于平铺的表单字段，如：姓名、性别、病历号...
* */

import React from 'react';
import { Row, Col } from 'antd';
import { getFormName, isMobile, isTileComponent } from '../_util';

import FormBox from './FormBox';

// 表单组件
import Text from './_components/Text';
import Date from './_components/Date';
import Radio from './_components/Radio';
import RadioDesc from './_components/RadioDesc';
import Number from './_components/Number';
import Select from './_components/Select';
import Textarea from './_components/Textarea';
import NumberDouble from './_components/NumberDouble';
import HospitalDepartments from './_components/HospitalDepartments';

const ele = {
  text: Text,
  date: Date,
  radio: Radio,
  radio_desc: RadioDesc,
  datetime: Date,
  number: Number,
  number_double: NumberDouble,
  select: Select,
  textarea: Textarea,
  hospital_departments: HospitalDepartments,
};

const Base = (props) => {
  const {
    enName,
    index = 0,
    fieldList = [],
  } = props;

  // 如果是 "门诊主体" 则平铺显示
  if (isTileComponent(enName)) {
    return (
      <FormBox {...props}>
        {fieldList.map(item => {
          const Component = ele[item.inputType];
          const names = getFormName(item.valueToName, index);

          return (
            <Component
              {...item}
              key={item.fieldNo}
              label={item.cnName}
              name={names[0]}
              name2={names[1]}
            />
          )
        })}
      </FormBox>
    );
  }

  return (
    <FormBox {...props}>
      <Row gutter={!isMobile && [16, 0]}>
        {fieldList.map(item => {
          const Component = ele[item.inputType];
          const names = getFormName(item.valueToName, index);

          return (
            <Col span={isMobile ? 24 : 12} key={item.fieldNo}>
              <Component
                {...item}
                label={item.cnName}
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
