/*
* 精液常规检查指标
* */

import React from 'react';
import { Table } from 'antd';
import { getFormName } from '../../_util';

const SemenRoutineQuota = (props) => {
  const {
    index = 0,
    fieldList = [],
    dataObject = {},
  } = props;

  const columns = [
    {
      title: '检查项目',
      dataIndex: 'cnName',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '结果',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[0]],
    },
    {
      title: '临床判断',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[1]],
    },
  ];

  return (
    <Table
      bordered
      size="small"
      rowKey="fieldNo"
      columns={columns}
      pagination={false}
      dataSource={fieldList}
    />
  );
};

export default SemenRoutineQuota;
