/*
* 指标检查，如：血常规、尿常规、肝肾功能
* */

import React, { useContext, useEffect } from 'react';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Divider, Table } from 'antd';
import { getFormName, outPutFormValues, getFormValues, isMobile } from '../_util';
import './index.less';

// 表单组件
import Text from '../_components/Text';
import Date from '../_components/Date';
import Radio from '../_components/Radio';
import Number from '../_components/Number';

import { EleContext } from './index';

const Inspect = (props) => {
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
      title: '结果',
      dataIndex: 'valueToName',
      render: (t) => <Number name={getFormName(t, index)[0]} message={message} />,
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '正常/异常判断',
      dataIndex: 'valueToName',
      render: (t) => <Radio name={getFormName(t, index)[1]} message={message} map={['正常', '异常']} />,
    },
    {
      title: '异常注释',
      dataIndex: 'valueToName',
      render: (t) => <Text name={getFormName(t, index)[2]} message={message} required={false} />,
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
      <div style={{ width: isMobile ? '100%' : 240 }}>
        <Date label="取样日期" name={`sampleDate_${index}`} />
      </div>
      <Table
        bordered
        columns={columns}
        pagination={false}
        dataSource={fieldList.filter(i => i.en !== 'sampleDate')}
        rowClassName="td-editable-row"
      />
    </React.Fragment>
  );
};

export default Inspect;
