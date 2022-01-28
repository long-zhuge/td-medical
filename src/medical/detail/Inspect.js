/*
* 指标检查，如：血常规、尿常规、肝肾功能
* */

import React, { useContext, useEffect, useState } from 'react';
import { Divider, Table } from 'antd';
import { getFormName, getFormValues } from '../../_util';

import { EleDetailContext } from './index';

const SemenRoutineQuota = (props) => {
  const {
    modeCn,
    index = 0,
    fieldList = [],
  } = props;

  const { data } = useContext(EleDetailContext);
  const [dataObject, setDataObject] = useState({});

  const columns = [
    {
      title: '检查项目',
      dataIndex: 'cn',
    },
    {
      title: '结果',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[0]],
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '正常/异常判断',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[1]],
    },
    {
      title: '异常注释',
      dataIndex: 'valueToName',
      render: (t) => dataObject[getFormName(t, index)[2]],
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
      <Divider>{modeCn}：{dataObject[`sampleDate_${index}`]}</Divider>
      <Table
        bordered
        columns={columns}
        pagination={false}
        dataSource={fieldList.filter(i => i.en !== 'sampleDate')}
      />
    </React.Fragment>
  );
};

export default SemenRoutineQuota;
