/*
* NRS评分组件
* */

import React, { useContext, useEffect, useState } from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { Table, Divider } from 'antd';
import { getFormValues, getFormName } from '../../../_util';

import { EleDetailContext } from '../index';

const dataSource = [
  { kps: '正常，无症状和体征', score: 100 },
  { kps: '能进行正常活动，有轻微症状和体征', score: 90 },
  { kps: '勉强可进行正常活动，有一些症状或体征', score: 80 },
  { kps: '生活可自理，但不能维持正常生活工作', score: 70 },
  { kps: '生活能大部分自理，但偶尔需要别人帮助', score: 60 },
  { kps: '常需人照料', score: 50 },
  { kps: '生活不能自理，需要特别照顾和帮助', score: 40 },
  { kps: '生活严重不能自理', score: 30 },
  { kps: '病重，需要住院和积极的支持治疗', score: 20 },
  { kps: '重危，临近死亡', score: 10 },
  { kps: '死亡', score: 0 },
];

const Qls = (props) => {
  const {
    cnName,
    index = 0,
    fieldList = [],
  } = props;

  const { data } = useContext(EleDetailContext);
  const [dataObject, setDataObject] = useState({});

  const columns = [
    {
      title: '序号',
      render: (_, __, idx) => idx + 1,
    },
    {
      title: 'Karnofsky（卡氏，kps，百分法）',
      dataIndex: 'kps',
    },
    {
      title: '分值',
      dataIndex: 'score',
    },
    {
      title: '评分',
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

      const field = getFormName('value1=scoreLife', index)[0];

      setDataObject(values[field]);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Divider>{cnName}</Divider>
      <Table
        bordered
        rowKey="enName"
        columns={columns}
        pagination={false}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Qls;
