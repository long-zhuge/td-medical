/*
* 指标检查，如：血常规、尿常规、肝肾功能
* */

import React from 'react';
import { Table } from 'antd';
import { getFormName } from '../../../_util';

const Inspect = (props) => {
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
      title: '结果',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[0]],
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '正常/异常判断',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[1]],
    },
    {
      title: '异常注释',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[2]],
    },
  ];

  const obj = fieldList.find(item => item.inputType === 'date');

  return (
    <Table
      bordered
      size="small"
      rowKey="fieldNo"
      columns={columns}
      pagination={false}
      title={obj ? () => `取样日期：${dataObject[`${obj.enName}_${index}`]}` : null}
      dataSource={fieldList.filter(i => !i.enName.includes('ampleDate'))}
    />
  );
};

export default Inspect;
