/*
* table 样式的表单详情数据
*  PS：合并用药
* */

import React, { useContext, useState, useEffect } from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { Divider, Table } from 'antd';
import typeOf from 'td-antd/es/tools/typeOf';
import { getFormValues } from '../../_util';

import { EleDetailContext } from './index';

const BaseTable = (props) => {
  const {
    cnName,
    index = 0,
    fieldList = [],
  } = props;

  const { formData } = useContext(EleDetailContext);
  const [dataSource, setDataSource] = useState([]);
  const [dataObject, setDataObject] = useState({});

  const columns = fieldList.map(item => ({
    align: 'center',
    title: item.cnName,
    render: ({ order }) => {
      const text = dataObject[`${item.enName}_${index}_${order}`];

      if (typeOf(text, 'Boolean')) {
        return text && <CheckOutlined />;
      }

      return text;
    },
  }));

  useEffect(() => {
    if (formData) {
      const { values, newDataSource } = getFormValues(formData, fieldList, index);

      setDataSource(newDataSource);
      setDataObject(values);
    }
  }, [formData]);

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

export default BaseTable;
