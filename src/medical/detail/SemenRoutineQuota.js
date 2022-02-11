/*
* 精液常规检查指标
* */

import React, { useContext, useEffect, useState } from 'react';
import { Divider, Table } from 'antd';
import { getFormName, getFormValues } from '../../_util';

import { EleDetailContext } from './index';

const SemenRoutineQuota = (props) => {
  const {
    cnName,
    index = 0,
    fieldList = [],
  } = props;

  const { data } = useContext(EleDetailContext);
  const [dataObject, setDataObject] = useState({});

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
      render: (t) => dataObject[getFormName(t, index)[0]],
    },
    {
      title: '临床判断',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[1]],
    },
  ];

  useEffect(() => {
    if (data) {
      const { values } = getFormValues(data, fieldList, index);

      setDataObject(values);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Divider>{cnName}</Divider>
      <Table
        bordered
        rowKey="fieldNo"
        columns={columns}
        pagination={false}
        dataSource={fieldList}
      />
    </React.Fragment>
  );
};

export default SemenRoutineQuota;
