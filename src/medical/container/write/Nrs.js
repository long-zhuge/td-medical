/*
* NRS评分组件
* */

import React from 'react';
import { Table } from 'antd';

import { EleFormItem } from '../../_components';
import FormBox from '../../FormBox';

const reg = /^([0-9]|10)$/;
const dataSource = [
  { name: '背景痛 NRS 评分', enName: 'backgroundNRS', extraRules: {
    pattern: reg,
    message: '请输入正确的分值',
  }},
  { name: '爆发痛 NRS 评分', enName: 'burstNRS', extraRules: {
    pattern: reg,
    message: '请输入正确的分值',
  }},
  { name: '爆发痛 次数/天', enName: 'burstCount', isInteger: true },
  { name: '爆发痛 持续时间', enName: 'burstDuration' },
];

const Nrs = (props) => {
  const {
    index = 0,
    fieldList = [],
  } = props;

  const columns = [
    {
      title: '',
      dataIndex: 'name',
    },
    {
      title: '分值',
      dataIndex: 'enName',
      render: (t, r, idx) => {
        const params = {...fieldList[idx], ...r};

        return (
          <EleFormItem
            {...params}
            key={params.fieldNo}
            name={`${t}_${index}`}
          />
        )
      },
    },
  ];

  return (
    <FormBox {...props}>
      <Table
        bordered
        size="small"
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
