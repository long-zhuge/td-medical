/*
* 基础组件，适用于平铺的表单字段，如：姓名、性别、病历号...
* */

import React, { useContext, useEffect } from 'react';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import { Divider, Row, Col } from 'antd';
import { getFormName, outPutFormValues, getFormValues, isMobile } from '../_util';

// 表单组件
import Text from '../_components/Text';
import Date from '../_components/Date';
import Number from '../_components/Number';
import Select from '../_components/Select';
import DateTime from '../_components/DateTime';
import Textarea from '../_components/Textarea';
import NumberDouble from '../_components/NumberDouble';
import HospitalDepartments from '../_components/HospitalDepartments';

import { EleContext } from './index';

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
    modeCn,
    index = 0,
    fieldList = [],
  } = props;

  const { form, data, onFinish } = useContext(EleContext);

  useEffect(() => {
    if (data) {
      const { values } = getFormValues(data, fieldList, index);

      form.setFieldsValue(values);
    }
  }, [data]);

  const onSave = () => {
    const fields = fieldList.reduce((p, c) => {
      const fieldsArray = getFormName(c.valueToName, index);

      return [...p, ...fieldsArray];
    }, []);

    form.validateFields(fields).then(values => {
      onFinish(outPutFormValues(values, fieldList));
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <React.Fragment>
      <Divider>{modeCn}<SaveOutlined style={{ marginLeft: 6, color: '#5468ff' }} onClick={onSave} /></Divider>
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
    </React.Fragment>
  );
};

export default Base;
