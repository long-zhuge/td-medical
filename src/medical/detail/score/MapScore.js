/*
* 外周运动神经障碍（Peripheral motor nerve disorder）
* */

import React, { useContext, useEffect, useState } from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { Table, Divider } from 'antd';
import tools from 'td-antd/es/tools';
import { getFormValues, getFormName, mapToScore } from '../../../_util';

import { EleDetailContext } from '../index';

const { typeOf } = tools;

const TEXT = {
  QLS: '分值',
};

const MapScore = (props) => {
  const {
    cnName,
    enName,
    index = 0,
    fieldList = [],
  } = props;

  const [dataSource] = useState(mapToScore(fieldList[0].map));
  const { formData } = useContext(EleDetailContext);
  const [currentScore, setCurrentScore] = useState(); // 当前分值
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
      render: (t) => {
        if(typeOf(currentScore, 'Number') && t === currentScore) {
          return <CheckOutlined />;
        }
      },
    },
  ];

  useEffect(() => {
    if (formData) {
      const { values } = getFormValues(formData, fieldList, index);

      const field = getFormName(fieldList[0].valueToName, index)[0];

      setCurrentScore(values[field]);
    }
  }, [formData]);

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
