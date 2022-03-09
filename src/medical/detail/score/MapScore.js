/*
* 外周运动神经障碍（Peripheral motor nerve disorder）
* */

import React, { useContext, useEffect, useState } from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { Table, Divider } from 'antd';
import { getFormValues, getFormName, mapToScore } from '../../../_util';

import { EleDetailContext } from '../index';

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
  const { data } = useContext(EleDetailContext);
  const [dataObject, setDataObject] = useState({});
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
        if (+t === +dataObject) {
          return <CheckOutlined />;
        }
      },
    },
  ];

  useEffect(() => {
    if (data) {
      const { values } = getFormValues(data, fieldList, index);

      const field = getFormName(fieldList[0].valueToName, index)[0];

      setDataObject(values[field]);
    }
  }, [data]);

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
