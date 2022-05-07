/*
* 外周运动神经障碍（Peripheral motor nerve disorder）
* */

import React, { useState } from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { Table, Divider } from 'antd';
import typeOf from 'td-antd/es/tools/typeOf';
import { mapToScore, getMapScoreConfig } from '../../../_util';

const MapScore = (props) => {
  const {
    cnName,
    enName,
    score,
    fieldList = [],
  } = props;

  const [dataSource] = useState(mapToScore(fieldList[0].map));
  const { titleTemplate, valueTemplate } = getMapScoreConfig(enName);

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
      title: titleTemplate,
      dataIndex: 'score',
      render: t => valueTemplate.replace('$1', t),
    },
    {
      title: '评估',
      dataIndex: 'score',
      render: (t) => {
        if(typeOf(score, 'Number') && t === score) {
          return <CheckOutlined />;
        }
      },
    },
  ];

  return (
    <React.Fragment>
      <Divider>{cnName}</Divider>
      <Table
        bordered
        size="small"
        rowKey="score"
        columns={columns}
        pagination={false}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default MapScore;
