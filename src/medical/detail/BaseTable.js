/*
* table 样式的表单详情数据
*  PS：合并用药
* */

import React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { Divider, Table } from 'antd';
import typeOf from 'td-antd/es/tools/typeOf';

const BaseTable = (props) => {
  const {
    cnName,
    index = 0,
    fieldList = [],
    dataObject = {},
    dataSource = [],
  } = props;

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
