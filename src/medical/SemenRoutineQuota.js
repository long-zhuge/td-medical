/*
* 精液常规检查指标，包含：精液量、精子浓度、前向运动精子、正常形态精子
* */

import React  from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Table } from 'antd';
import { getFormName, isMobile, mobileTableProps } from '../_util';

import FormBox from './FormBox';

// 表单组件
import Number from './_components/Number';
import Text from './_components/Text';

const SemenRoutineQuota = (props) => {
  const {
    index = 0,
    fieldList = [],
  } = props;

  console.log(fieldList);

  const message = isMobile ? <ExclamationCircleOutlined /> : undefined;

  const columns = [
    {
      title: '检查项目',
      dataIndex: 'cnName',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '结果',
      dataIndex: 'valueToName',
      render: (t) => <Number name={getFormName(t, index)[0]} message={message} />,
    },
    {
      title: '临床判断',
      dataIndex: 'valueToName',
      render: (t) => <Text name={getFormName(t, index)[1]} message={message} />,
    },
  ];

  return (
    <FormBox {...props}>
      <Table
        bordered
        rowKey="fieldNo"
        columns={columns}
        pagination={false}
        dataSource={fieldList}
        rowClassName="td-editable-row"
        {...mobileTableProps}
      />
    </FormBox>
  );
};

export default SemenRoutineQuota;
