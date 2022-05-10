/*
* NRS评分组件
* */

import React from 'react';
import { Table } from 'antd';
import { getFormName, renderValue } from '../../../_util';

const Nrs = (props) => {
  const {
    index = 0,
    fieldList = [],
    dataObject = {},
  } = props;

  const columns = [
    {
      title: '',
      dataIndex: 'cnName',
    },
    {
      title: '分值',
      dataIndex: 'valueToName',
      render: (t, r) => renderValue({
        dataObject,
        keys: getFormName(r.valueToName, index),
        unit: r.unit,
        inputType: r.inputType,
      }),
    },
  ];

  return (
    <Table
      bordered
      size="small"
      rowKey="enName"
      columns={columns}
      pagination={false}
      dataSource={fieldList}
    />
  );
};

export default Nrs;
