/*
* 评分改善类型组件：生活质量评分改善
* */

import React from 'react';
import { Table } from 'antd';
import { getFormName } from '../../../_util';

const MapScoreImprove = (props) => {
  const {
    index = 0,
    fieldList = [],
    dataObject = {},
  } = props;

  const columns = [
    {
      width: 50,
      title: '序号',
      render: (_, __, idx) => idx + 1,
    },
    {
      title: '描述',
      dataIndex: 'cnName',
    },
    {
      width: 140,
      title: '治疗前',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[0]],
    },
    {
      width: 140,
      title: '治疗后',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[1]],
    },
  ];

  return (
    <Table
      bordered
      size="small"
      rowKey="score"
      columns={columns}
      pagination={false}
      dataSource={fieldList}
    />
  );
};

export default MapScoreImprove;
