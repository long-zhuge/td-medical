/*
* 合并用药
* */

import React, { useContext, useState, useEffect } from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { Divider, Table } from 'antd';
import { getFormValues } from '../../_util';

import { EleDetailContext } from './index';

const CombinedMedication = (props) => {
  const {
    cnName,
    index = 0,
    fieldList = [],
  } = props;

  const { data } = useContext(EleDetailContext);
  const [dataSource, setDataSource] = useState([]);
  const [dataObject, setDataObject] = useState({});

  const columns = [
    {
      align: 'center',
      title: '药物名称',
      render: ({ order }) => dataObject[`drugName_${index}_${order}`],
    },
    {
      align: 'center',
      title: '用法',
      render: ({ order }) => dataObject[`usage_${index}_${order}`],
    },
    {
      align: 'center',
      title: '用量',
      render: ({ order }) => dataObject[`dosage_${index}_${order}`],
    },
    {
      align: 'center',
      title: '开始日期',
      render: ({ order }) => dataObject[`startDate_${index}_${order}`],
    },
    {
      align: 'center',
      title: '结束日期',
      render: ({ order }) => dataObject[`endDate_${index}_${order}`],
    },
    {
      align: 'center',
      title: '末次就诊时仍使用',
      render: ({ order }) => dataObject[`lastUse_${index}_${order}`] && <CheckOutlined />,
    },
  ];

  useEffect(() => {
    if (data) {
      const { values, newDataSource } = getFormValues(data, fieldList, index);

      setDataSource(newDataSource);
      setDataObject(values);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Divider>{cnName}</Divider>
      <Table
        bordered
        rowKey="order"
        columns={columns}
        pagination={false}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default CombinedMedication;
