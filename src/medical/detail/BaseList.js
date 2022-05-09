/*
* 基础组件详情，适用于平铺的表单字段，如：姓名、性别、病历号...
* */

import React, { useContext } from 'react';
import DescList from 'td-antd/es/desc-list';
import { getFormName, renderValue, isTileComponent, idTransformString } from '../../_util';

import { EleDetailContext } from './index';

const BaseList = (props) => {
  const {
    enName,
    index = 0,
    fieldList = [],
    dataObject = {},
  } = props;

  const { regionFlat, deptFlat } = useContext(EleDetailContext);

  const columns = fieldList.map(item => ({
    title: item.cnName,
    className: 'pre-wrap',
    render: () => {
      const value = renderValue({
        dataObject,
        keys: getFormName(item.valueToName, index),
        unit: item.unit,
      });

      // 如果是地区，则将地区 id 转为中文
      if (item.inputType === 'cascader' && value) {
        const flatData = {
          'region': regionFlat,
          'hospitalDepartments': deptFlat,
        }[item.enName];
        return idTransformString(value, flatData);
      }

      return value;
    },
  }));

  return (
    <DescList
      column={isTileComponent(enName) ? 1 : 2}
      columns={columns}
      dataSource={dataObject}
    />
  );
};

export default BaseList;
