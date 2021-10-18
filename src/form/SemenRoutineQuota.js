/*
* 精液常规检查指标，包含：精液量、精子浓度、前向运动精子、正常形态精子
* */

import React, { useContext, useEffect } from 'react';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Divider, Table } from 'antd';
import { getFormName, outPutFormValues, getFormValues, isMobile } from '../_util';

// 表单组件
import Number from '../_components/Number';
import Text from '../_components/Text';

import { EleContext } from './index';

const SemenRoutineQuota = (props) => {
  const {
    modeCn,
    index = 0,
    fieldList = [],
  } = props;

  const { form, data, onFinish } = useContext(EleContext);
  const message = isMobile ? <ExclamationCircleOutlined /> : undefined;

  const columns = [
    {
      title: '检查项目',
      dataIndex: 'cn',
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

  useEffect(() => {
    if (data) {
      const { values } = getFormValues(data, fieldList, index);

      form.setFieldsValue(values);
    }
  }, [data]);

  const onSave = () => {
    const fields = fieldList.reduce((p, c) => {
      const fieldsArray = getFormName(c.valueToName, index);

      return [...p, ...fieldsArray];
    }, []);

    form.validateFields(fields).then(values => {
      onFinish(outPutFormValues(values, fieldList));
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <React.Fragment>
      <Divider>{modeCn}<SaveOutlined style={{ marginLeft: 6, color: '#5468ff' }} onClick={onSave} /></Divider>
      <Table
        bordered
        columns={columns}
        pagination={false}
        dataSource={fieldList}
        rowClassName="td-editable-row"
      />
    </React.Fragment>
  );
};

export default SemenRoutineQuota;
