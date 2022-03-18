/*
* 基础组件详情，适用于平铺的表单字段，如：姓名、性别、病历号...
* */

import React from 'react';
import { Divider } from 'antd';
import DescList from 'td-antd/es/desc-list';
import { getFormName, renderValue, isTileComponent } from '../../_util';

const BaseList = (props) => {
  const {
    enName,
    cnName,
    index = 0,
    fieldList = [],
    dataObject = {},
  } = props;

  const columns = fieldList.map(item => ({
    title: item.cnName,
    render: () => renderValue({
      dataObject,
      keys: getFormName(item.valueToName, index),
      unit: item.unit,
    }),
  }));

  return (
    <React.Fragment>
      <Divider>{cnName}</Divider>
      <DescList
        column={isTileComponent(enName) ? 1 : 2}
        columns={columns}
        dataSource={dataObject}
      />
    </React.Fragment>
  );
};

export default BaseList;
