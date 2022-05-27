/*
* 评分改善类型组件：ISL、IQLS
* */

import React, { useState, useEffect } from 'react';
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

  const [bool, setBool] = useState(false);
  const [columnRemark, setColumnRemark] = useState([]);

  useEffect(() => {
    const obj = fieldList[0];

    if (obj.remarks) {
      setColumnRemark([{
        title: '分值说明',
        dataIndex: 'remarks',
        className: 'pre-wrap',
      }])
    }

    if (getFormName(obj.valueToName, index).length >= 2) {
      setBool(true);
    }

  }, [fieldList]);

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
    ...columnRemark,
    {
      width: 140,
      title: bool ? '治疗前' : '评分',
      dataIndex: 'valueToName',
      render: (t, r) => <Number name={getFormName(t, index)[0]} required={r.required} extraRules={extraRules} />,
    },
  ].concat(bool ? [{
    width: 140,
    title: '治疗后',
    dataIndex: 'valueToName',
    render: (t, r) => <Number name={getFormName(t, index)[1]} required={r.required} extraRules={extraRules} />,
  }] : []);

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
