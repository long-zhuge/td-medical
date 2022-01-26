/*
* 基础组件详情，适用于平铺的表单字段，如：姓名、性别、病历号...
* */

import React, { useContext, useEffect, useState } from 'react';
import { Divider } from 'antd';
import DescList from 'td-antd/es/desc-list';
import { getFormValues, getFormName, renderValue } from '../_util';

import { EleDetailContext } from './index';

const Base = (props) => {
  const {
    modeEn,
    modeCn,
    index = 0,
    fieldList = [],
  } = props;

  const { data } = useContext(EleDetailContext);
  const [dataObject, setDataObject] = useState({});

  const columns = fieldList.map(item => ({
    title: item.cn,
    render: () => renderValue({
      dataObject,
      keys: getFormName(item.valueToName, index),
      unit: item.unit,
    }),
  }));

  useEffect(() => {
    if (data) {
      const { values } = getFormValues(data, fieldList, index);

      setDataObject(values);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Divider>{modeCn}</Divider>
      <DescList
        column={modeEn === 'outpatientContent' ? 1 : 2}
        columns={columns}
        dataSource={dataObject}
      />
    </React.Fragment>
  );
};

export default Base;
