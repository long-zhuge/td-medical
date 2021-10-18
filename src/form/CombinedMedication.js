/*
* 合并用药，包含：药物名称、用法、用量、开始日期、结束日期、末次就诊时仍使用
* */

import React, { useContext, useState, useEffect } from 'react';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { Divider, Table } from 'antd';
import LinkBtn from 'td-antd/es/link-btn';
import tools from 'td-antd/es/tools';
import { getFormName, outPutFormValues, clone, getFormValues } from '../_util';
import './index.less';

// 表单组件
import Text from '../_components/Text';
import Date from '../_components/Date';
import CheckBox from '../_components/CheckBox';

const { genNonDuplicateID } = tools;

import { EleContext } from './index';

const CombinedMedication = (props) => {
  const {
    modeCn,
    index = 0,
    fieldList = [],
  } = props;

  const { form, data, onFinish } = useContext(EleContext);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      align: 'center',
      title: '药物名称',
      render: ({ order }) => <Text name={`drugName_${index}_${order}`} />,
    },
    {
      align: 'center',
      title: '用法',
      render: ({ order }) => <Text name={`usage_${index}_${order}`} />,
    },
    {
      align: 'center',
      title: '用量',
      render: ({ order }) => <Text name={`dosage_${index}_${order}`} />,
    },
    {
      align: 'center',
      title: '开始日期',
      render: ({ order }) => <Date name={`startDate_${index}_${order}`} />,
    },
    {
      align: 'center',
      title: '结束日期',
      render: ({ order }) => <Date name={`endDate_${index}_${order}`} />,
    },
    {
      align: 'center',
      title: '末次就诊时仍使用',
      render: ({ order }) => <CheckBox name={`lastUse_${index}_${order}`} />,
    },
    {
      width: 50,
      align: 'center',
      title: '操作',
      render: ({ order }) => <LinkBtn onClick={() => onRemove(order)}><DeleteOutlined /></LinkBtn>,
    },
  ];

  useEffect(() => {
    if (data) {
      const { values, newDataSource = [] } = getFormValues(data, fieldList, index);

      setDataSource(newDataSource);
      form.setFieldsValue(values);
    }
  }, [data]);

  const onSave = () => {
    const fields = fieldList.reduce((p, c) => {
      const fieldsArray = dataSource.reduce((p2, c2) => [...p2, `${getFormName(c.valueToName, index)[0]}_${c2.order}`], []);

      return [...p, ...fieldsArray];
    }, []);

    form.validateFields(fields).then(values => {
      onFinish(outPutFormValues(values, fieldList));
    }).catch((err) => {
      console.log(err);
    })
  };

  // 移除某一行
  const onRemove = (order) => {
    const newDataSource = dataSource.filter(item => item.order !== order);

    setDataSource(clone(newDataSource));
  };

  // 新增一行数据
  const onAdd = () => {
    const list = [...dataSource, { order: genNonDuplicateID(4) }];

    setDataSource(list);
  };

  return (
    <React.Fragment>
      <Divider>{modeCn}<SaveOutlined style={{ marginLeft: 6, color: '#5468ff' }} onClick={onSave} /></Divider>
      <Table
        bordered
        rowKey="order"
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        rowClassName="td-editable-row"
      />
      <div className="medical_element_add" onClick={onAdd}>+</div>
    </React.Fragment>
  );
};

export default CombinedMedication;
