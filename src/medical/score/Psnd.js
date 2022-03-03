/*
* 外周感觉神经障碍（Peripheral sensory nerve disorder）
* */

import React from 'react';
import { Table, Radio } from 'antd';
import FormItem from 'td-antd/es/form-item';

import FormBox from '../FormBox';

const dataSource = [
  { kps: '无症状，没有深腱反射丧失或感觉异常', score: 1 },
  { kps: '中度症状，影响工具性日常生活活动', score: 2 },
  { kps: '重度症状，影响个人日常生活活动', score: 3 },
  { kps: '危及生命，需紧急处理', score: 4 },
  { kps: '死亡', score: 5 },
];

const Psnd = (props) => {
  const {
    index = 0,
    fieldList = [],
  } = props;

  const columns = [
    {
      title: '序号',
      render: (_, __, idx) => idx + 1,
    },
    {
      title: '临床表现',
      dataIndex: 'kps',
    },
    {
      title: '分级',
      dataIndex: 'score',
      render: t => `${t}级`,
    },
    {
      title: '评估',
      dataIndex: 'score',
      render: (t) => <Radio value={t} />,
    },
  ];

  return (
    <FormBox {...props}>
      <FormItem name={`${fieldList[0].enName}_${index}`} required={false}>
        <Radio.Group style={{ width: '100%' }}>
          <Table
            bordered
            size="small"
            rowKey="enName"
            columns={columns}
            pagination={false}
            dataSource={dataSource}
            rowClassName="td-editable-row"
          />
        </Radio.Group>
      </FormItem>
    </FormBox>
  );
};

export default Psnd;
