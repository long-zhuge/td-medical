/*
* NRS评分组件
* */

import React from 'react';
import { Table, Divider } from 'antd';
import { getFormName } from '../../../_util';

const Nrs = (props) => {
  const {
    cnName,
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
    <React.Fragment>
      <Divider>{cnName}</Divider>
      <div>注：0分 无疼痛，1-3分轻度疼痛，4-6分中度疼痛，7-10分重度疼痛</div>
      <Table
        bordered
        size="small"
        rowKey="enName"
        columns={columns}
        pagination={false}
        dataSource={fieldList}
      />
    </React.Fragment>
  );
};

export default Nrs;
