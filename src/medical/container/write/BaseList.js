/*
* 基础组件，适用于平铺的表单字段，如：姓名、性别、病历号...
* */

import React from 'react';
import { Row, Col } from 'antd';
import { getFormName, isMobile, isTileComponent } from '../../../_util';
import { EleFormItem } from '../../_components';
import FormBox from '../../FormBox';

// 该组件不用渲染 label
const NO_LABEL = ['projectDesc'];

const BaseList = (props) => {
  const {
    enName,
    index = 0,
    fieldList = [],
  } = props;

  const isNoLabel = NO_LABEL.includes(enName);

  // 如果是 "门诊主体" 则平铺显示
  if (isTileComponent(enName)) {
    return (
      <FormBox {...props}>
        {fieldList.map(item => {
          const names = getFormName(item.valueToName, index);

          return (
            <EleFormItem
              {...item}
              key={item.fieldNo}
              name={names[0]}
              name2={names[1]}
              label={isNoLabel ? '' : item.cnName}
            />
          );
        })}
      </FormBox>
    );
  }

  return (
    <FormBox {...props}>
      <Row gutter={!isMobile && [16, 0]}>
        {fieldList.map(item => {
          const names = getFormName(item.valueToName, index);

          return (
            <Col span={isMobile ? 24 : 12} key={item.fieldNo}>
              <EleFormItem
                {...item}
                label={isNoLabel ? '' : item.cnName}
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

export default BaseList;
