/*
* NRS评分组件
* */

import React from 'react';
import { Table } from 'antd';

import FormBox from '../FormBox';

// 表单组件
import Text from '../_components/Text';

const dataSource = [
  { name: '背景痛 NRS 评分', enName: 'backgroundNRS' },
  { name: '爆发痛 NRS 评分', enName: 'burstNRS' },
  { name: '爆发痛 次数/天', enName: 'burstCount' },
  { name: '爆发痛 持续时间', enName: 'burstDuration' },
];

const Nrs = (props) => {
  const {
    index = 0,
  } = props;

  const columns = [
    {
      title: '',
      dataIndex: 'name',
    },
    {
      title: '分值',
      dataIndex: 'enName',
      render: (t) => <Text name={`${t}_${index}`} />,
    },
  ];

  return (
    <FormBox {...props}>
      <div>注：0分 无疼痛，1-3分轻度疼痛，4-6分中度疼痛，7-10分重度疼痛</div>
      <Table
        bordered
        rowKey="enName"
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        rowClassName="td-editable-row"
      />
    </FormBox>
  );
};

export default Nrs;
