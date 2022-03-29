/*
* 指标检查，如：血常规、尿常规、肝肾功能
* */

import React  from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Table } from 'antd';
import { getFormName, isMobile, mobileTableProps } from '../_util';

import './index.less';

import { Text, Date, Radio, Number } from './_components';
import FormBox from './FormBox';

const Inspect = (props) => {
  const {
    index = 0,
    fieldList = [],
  } = props;
  const message = isMobile ? <ExclamationCircleOutlined /> : undefined;

  const columns = [
    {
      title: '检查项目',
      dataIndex: 'cnName',
    },
    {
      title: '结果',
      dataIndex: 'valueToName',
      render: (t, r) => <Number name={getFormName(t, index)[0]} message={message} required={r.required} />,
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '正常/异常判断',
      dataIndex: 'valueToName',
      render: (t, r) => <Radio name={getFormName(t, index)[1]} message={message} map="正常#异常且无临床意义#异常且有临床意义" required={r.required} />,
    },
    {
      title: '备注',
      dataIndex: 'valueToName',
      render: (t, r) => <Text name={getFormName(t, index)[2]} message={message} required={r.required} />,
    },
  ];

  // 渲染"取样日期"
  const renderDate = () => {
    const obj = fieldList.filter(item => item.inputType === 'date')[0];

    if (obj) {
      return (
        <div style={{ width: isMobile ? '100%' : 240 }}>
          <Date inputType={obj.inputType} label={obj.cnName} name={`${obj.enName}_${index}`} required={obj.required} />
        </div>
      );
    }
  };

  return (
    <FormBox {...props}>
      {renderDate()}
      <Table
        bordered
        size="small"
        rowKey="fieldNo"
        columns={columns}
        pagination={false}
        dataSource={fieldList.filter(i => !i.enName.includes('ampleDate'))}
        rowClassName="td-editable-row"
        {...mobileTableProps}
      />
    </FormBox>
  );
};

export default Inspect;
