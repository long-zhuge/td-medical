/*
* 指标检查，如：血常规、尿常规、肝肾功能
* */

import React from 'react';
import { Divider, Table } from 'antd';
import { getFormName } from '../../_util';

const SemenRoutineQuota = (props) => {
  const {
    cnName,
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

  const renderTitle = () => {
    const date = dataObject[`sampleDate_${index}`];

    return date ? `${cnName}：${date}` : cnName;
  };

  return (
    <React.Fragment>
      <Divider>{renderTitle()}</Divider>
      <Table
        bordered
        rowKey="fieldNo"
        columns={columns}
        pagination={false}
        dataSource={fieldList.filter(i => i.enName !== 'sampleDate')}
      />
    </React.Fragment>
  );
};

export default SemenRoutineQuota;
