/*
* 评分改善类型组件：生活质量评分改善
* */

import React from 'react';
import { Table } from 'antd';
import FormBox from '../../FormBox';
import { Number } from '../../_components';
import { getFormName } from '../../../_util';

const extraRules = {
  pattern: /^[0-3]$/,
  message: '请填写0~3的值',
};

const MapScoreImprove = (props) => {
  const {
    index = 0,
    fieldList = [],
  } = props;

  const remark = fieldList[0].remarks ? [
    {
      title: '分值说明',
      dataIndex: 'remarks',
      className: 'pre-wrap',
    },
  ] : [];

  const columns = [
    {
      width: 50,
      title: '序号',
      render: (_, __, idx) => idx + 1,
    },
    {
      title: '描述',
      dataIndex: 'cnName',
    },
    ...remark,
    {
      width: 140,
      title: '治疗前',
      dataIndex: 'valueToName',
      render: (t, r) => <Number name={getFormName(t, index)[0]} required={r.required} extraRules={extraRules} />,
    },
    {
      width: 140,
      title: '治疗后',
      dataIndex: 'valueToName',
      render: (t, r) => <Number name={getFormName(t, index)[1]} required={r.required} extraRules={extraRules} />,
    },
  ];

  return (
    <FormBox {...props}>
      <Table
        bordered
        size="small"
        rowKey="score"
        columns={columns}
        pagination={false}
        dataSource={fieldList}
        rowClassName="td-editable-row"
      />
    </FormBox>
  );
};

export default MapScoreImprove;
