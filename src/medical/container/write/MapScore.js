/*
* map 中含有分值信息的公共组件
* */

import React, { useState } from 'react';
import { Table, Radio } from 'antd';
import FormItem from 'td-antd/es/form-item';
import { mapToScore, getMapScoreConfig } from '../../../_util';
import FormBox from '../../FormBox';

const MapScore = (props) => {
  const {
    enName,
    index = 0,
    fieldList = [],
  } = props;

  const [dataSource] = useState(mapToScore(fieldList[0].map));
  const { titleTemplate, titleTemplate2, valueTemplate } = getMapScoreConfig(enName);

  const columns = [
    {
      width: 50,
      title: '序号',
      render: (_, __, idx) => idx + 1,
    },
    {
      title: titleTemplate,
      dataIndex: 'kps',
    },
    {
      width: 100,
      title: titleTemplate2,
      dataIndex: 'score',
      render: t => valueTemplate.replace('$1', t),
    },
    {
      width: 100,
      title: '评估',
      dataIndex: 'score',
      render: (t) => <Radio value={/^[0-9]*$/.test(t) ? +t : t} />,
    },
  ];

  return (
    <FormBox {...props}>
      <FormItem name={`${fieldList[0].enName}_${index}`} required={fieldList[0].required}>
        <Radio.Group style={{ width: '100%' }}>
          <Table
            bordered
            size="small"
            rowKey="score"
            columns={columns}
            pagination={false}
            dataSource={dataSource}
            rowClassName="td-editable-row"
          />
        </Radio.Group>
      </FormItem>
    </FormBox>
  );
};

export default MapScore;
