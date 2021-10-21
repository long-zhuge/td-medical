/*
* 合并用药，包含：药物名称、用法、用量、开始日期、结束日期、末次就诊时仍使用
* */

import React, { useContext, useState } from 'react';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { Table } from 'antd';
import LinkBtn from 'td-antd/es/link-btn';
import tools from 'td-antd/es/tools';
import { getFormName, clone, getFormValues, mobileTableProps } from '../_util';
import './index.less';

import FormBox from './FormBox';

// 表单组件
import Text from '../_components/Text';
import Date from '../_components/Date';
import CheckBox from '../_components/CheckBox';

const { genNonDuplicateID } = tools;

import { EleContext } from './index';

const CombinedMedication = (props) => {
  const {
    index = 0,
    fieldList = [],
  } = props;

  const { form, data } = useContext(EleContext);
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
      width: 100,
      align: 'center',
      title: '操作',
      render: ({ order }) => <LinkBtn onClick={() => onRemove(order)}><DeleteOutlined /></LinkBtn>,
    },
  ];

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
    <FormBox
      {...props}
      customSetFieldsValue={() => {
        const { values, newDataSource = [] } = getFormValues(data, fieldList, index);

        setDataSource(newDataSource);
        form.setFieldsValue(values);
      }}
      onBeforeSave={() => {
        return fieldList.reduce((p, c) => {
          const fieldsArray = dataSource.reduce((p2, c2) => [...p2, `${getFormName(c.valueToName, index)[0]}_${c2.order}`], []);

          return [...p, ...fieldsArray];
        }, []);
      }}
    >
      <Table
        bordered
        rowKey="order"
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        rowClassName="td-editable-row"
        {...mobileTableProps}
      />
      <div className="medical_element_add" onClick={onAdd}>+</div>
    </FormBox>
  );
};

export default CombinedMedication;
