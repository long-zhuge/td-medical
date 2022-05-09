/*
* NRS评分组件
* */

import React from 'react';
import { Table } from 'antd';
import { getFormName } from '../../../_util';

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
      render: (t) => dataObject[getFormName(t, index)[0]],
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
