/*
* table 样式，且可增加条数的表单
*   PS：合并用药
* */

import React, { useContext, useState } from 'react';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { Table } from 'antd';
import LinkBtn from 'td-antd/es/link-btn';
import { getFormName, clone, mobileTableProps, genId } from '../../../_util';

import { EleFormItem } from '../../_components';
import FormBox from '../../FormBox';

import { EleContext } from '../../index';

const BaseTable = (props) => {
  const {
    index = 0,
    fieldList = [],
  } = props;

  const { form } = useContext(EleContext);
  const [dataSource, setDataSource] = useState([]);

  const columns = fieldList.map(item => ({
    align: 'center',
    title: item.cnName,
    render: ({ order }) => {
      return (
        <EleFormItem
          {...item}
          key={item.fieldNo}
          name={`${item.enName}_${index}_${order}`}
        />
      )
    },
  })).concat({
    width: 100,
    align: 'center',
    title: '操作',
    render: ({ order }) => <LinkBtn danger onClick={() => onRemove(order)}><DeleteOutlined /></LinkBtn>,
  });

  // 移除某一行
  const onRemove = (order) => {
    const newDataSource = dataSource.filter(item => item.order !== order);

    setDataSource(clone(newDataSource));
  };

  // 新增一行数据
  const onAdd = () => {
    const list = [...dataSource, { order: genId(4) }];

    setDataSource(list);
  };

  return (
    <FormBox
      {...props}
      customSetFieldsValue={({ values, newDataSource = [] }) => {
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

export default BaseTable;
