/*
* 生育史
* */

import React from 'react';
import DescList from 'td-antd/es/desc-list';
import { getFormName, renderValue } from '../../../_util';

const ReproductiveHistory = (props) => {
  const {
    index = 0,
    fieldList = [],
    dataObject = {},
  } = props;

  const columns = fieldList.map(item => ({
    title: item.cnName,
    className: 'pre-wrap',
    visible: r => !!r[`${item.enName}_${index}`],
    render: () => renderValue({
      dataObject,
      keys: getFormName(item.valueToName, index),
      unit: item.unit,
      inputType: item.inputType,
    }),
  }));

  return (
    <DescList
      column={2}
      columns={columns}
      dataSource={dataObject}
    />
  );
};

export default ReproductiveHistory;
