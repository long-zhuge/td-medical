/*
* 外周运动神经障碍（Peripheral motor nerve disorder）
* */

import React, { useState } from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { Table, Divider } from 'antd';
import { mapToScore, getMapScoreConfig } from '../../../_util';

const MapScore = (props) => {
  const {
    cnName,
    enName,
    score,
    fieldList = [],
  } = props;

  const [dataSource] = useState(mapToScore(fieldList[0].map));
  const { titleTemplate, titleTemplate2, valueTemplate } = getMapScoreConfig(enName);

  const columns = [
    {
      width: 50,
      title: '序号',
      render: (_, __, idx) => idx + 1,
    },
    {
      title: titleTemplate,
      dataIndex: 'kps',
    },
    {
      width: 100,
      title: titleTemplate2,
      dataIndex: 'score',
      render: t => valueTemplate.replace('$1', t),
    },
    {
      width: 100,
      title: '评估',
      dataIndex: 'score',
      render: (t) => {
        if(t == score) {
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
