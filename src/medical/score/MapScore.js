/*
* map 中含有分值信息的公共组件
* */

import React, { useState } from 'react';
import { Table, Radio } from 'antd';
import FormItem from 'td-antd/es/form-item';
import { mapToScore } from '../../_util';

import FormBox from '../FormBox';

const TEXT = {
  QLS: '分值',
};

const MapScore = (props) => {
  const {
    enName,
    index = 0,
    fieldList = [],
  } = props;

  const [dataSource] = useState(mapToScore(fieldList[0].map));
  const scoreTitle = TEXT[enName];

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
      title: scoreTitle || '分级',
      dataIndex: 'score',
      render: t => `${t}${scoreTitle ? '' : '级'}`,
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
            rowKey="score"
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

export default MapScore;
