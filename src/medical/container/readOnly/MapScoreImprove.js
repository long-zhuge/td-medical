/*
* 评分改善类型组件：ISL、IQLS
* */

import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { getFormName } from '../../../_util';

const MapScoreImprove = (props) => {
  const {
    index = 0,
    fieldList = [],
    dataObject = {},
  } = props;

  const [bool, setBool] = useState(false);
  const [columnRemark, setColumnRemark] = useState([]);

  useEffect(() => {
    const obj = fieldList[0];

    if (obj.remarks) {
      setColumnRemark([{
        title: '分值说明',
        dataIndex: 'remarks',
        className: 'pre-wrap',
      }])
    }

    if (getFormName(obj.valueToName, index).length >= 2) {
      setBool(true);
    }

  }, [fieldList]);

  const columns = [
    {
      width: 50,
      title: '序号',
      render: (_, __, idx) => idx + 1,
    },
    {
      title: '描述',
      dataIndex: 'cnName',
      className: 'pre-wrap',
    },
    ...columnRemark,
    {
      width: 140,
      title: bool ? '治疗前' : '评分',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[0]],
    },
  ].concat(bool ? [{
    width: 140,
    title: '治疗后',
    dataIndex: 'valueToName',
    render: (t) => dataObject[getFormName(t, index)[1]],
  }] : []);

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
