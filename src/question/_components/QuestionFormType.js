/*
* 类型：form 表单类型
* */

import React, { useContext } from 'react';
import { Input, InputNumber, Cascader, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SelectList from 'td-antd/es/select-list';
import DateEasily from 'td-antd/es/date-easily';
import TdUpload from 'td-antd/es/td-upload'
import momentToString from 'td-antd/es/tools/momentToString';
import { Context } from '../index';

const baseCls = 'td-medical-question-form-type';

function ValueInput(props) {
  const { readOnly, initialValue, value, onChange, ...rest } = props;

  const handleChange = (e) => {
    onChange(e.target.value);
  }

  return readOnly ? <span className={`${baseCls}-text`}>{value}</span> : (
    <Input
      {...rest}
      value={value}
      onChange={handleChange}
    />
  );
}

function PriceInput(props) {
  const { readOnly, initialValue, value, currency = '¥', ...rest } = props;

  const formatter = (v) => (
    v && `${currency} ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  )

  return readOnly ? <span className={`${baseCls}-text`}>{formatter(value)}</span> : (
    <InputNumber
      {...rest}
      min={1}
      style={{ width: '100%' }}
      value={value}
      formatter={formatter}
      parser={v => v && v.replace(new RegExp(`${currency}\\s?|(,*)`, 'g'), '')}
    />
  );
}

function RegionSelect(props) {
  const { pcas } = useContext(Context);
  const { readOnly, initialValue, value, onChange, ...rest } = props;

  const handleChange = (_, selectedOptions) => {
    onChange(selectedOptions.map(o => ({ label: o.label, value: o.value })));
  }

  return readOnly ? (
    <span className={`${baseCls}-text`}>{value?.map(v => v.label).filter(v => v).join('-')}</span>
  ) : (
    <Cascader
      options={pcas}
      value={value && value.map(v => v.value)}
      onChange={handleChange}
      {...rest}
    />
  );
}

function ProductSelect(props) {
  const { productParam } = useContext(Context);
  const { readOnly, initialValue, value, onChange, ...rest } = props;

  // ensure the second param pass to onChange is error message
  const handleChange = (s) => {
    onChange({ value: s.value, label: s.label });
  }

  return readOnly ? <span className={`${baseCls}-text`}>{value?.label}</span> : (
    <SelectList
      labelInValue
      url="/product/getPageList.json"
      defaultParams={productParam}
      fields={['productNo', 'productName']}
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
}

function RangeDate(props) {
  const { readOnly, initialValue, value, onChange, ...rest } = props;

  const handleChange = (date) => {
    onChange(date && [momentToString(date[0]), momentToString(date[1])]);
  }

  return readOnly ? <span className={`${baseCls}-text`}>{value?.join(' 至 ')}</span> : (
    <DateEasily
      type="RangePicker"
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
}

function ImageUpload(props) {
  const { readOnly, initialValue, value, onChange, ...rest } = props;

  return (
    <TdUpload
      hidden={readOnly}
      hideRemoveBtn={readOnly}
      fileTypes={['image']}
      isPreview
      listType="picture-card"
      isImageUrl={() => true}
      initial={initialValue}
      callback={(status, file, _, onUpload) => {
        if (status === 'after') {
          onUpload().then(([files]) => onChange(files.map(item => ({
            fileName: item.fileName,
            fileNumber: item.fileNumber,
            path: item.path,
          }))));
        }
        if (status === 'remove') {
          onChange(value.filter(item => item.fileNumber !== file.uid));
        }
      }}
      {...rest}
    />
  );
}

function CompeteProduct(props) {
  const { readOnly, initialValue, value = [], onChange, ...rest } = props;

  const handleChange = (idx, field, cellValue) => {
    const rowValue = { ...value[idx], [field]: cellValue };
    onChange([
      ...value.slice(0, idx),
      rowValue,
      ...value.slice(idx + 1),
    ]);
  }

  const add = () => {
    onChange(value.concat({}));
  }

  const remove = (idx) => {
    onChange(value.filter((row, i) => i !== idx));
  }

  const columns = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (t, r, i) => i + 1,
    },
    {
      title: '竞品名称',
      dataIndex: 'name',
      width: '25%',
      render: (t, r, i) => (
        <ValueInput
          readOnly={readOnly}
          value={t}
          onChange={handleChange.bind(null, i, 'name')}
        />
      ),
    },
    {
      title: '竞品图片',
      dataIndex: 'photo',
      width: '50%',
      render: (t, r, i) => (
        <ImageUpload
          readOnly={readOnly}
          initialValue={initialValue?.[i]?.photo}
          value={t}
          onChange={handleChange.bind(null, i, 'photo')}
        />
      ),
    },
    {
      title: '竞品价格',
      dataIndex: 'price',
      width: '25%',
      render: (t, r, i) => (
        <PriceInput
          readOnly={readOnly}
          value={t}
          onChange={handleChange.bind(null, i, 'price')}
        />
      ),
    },
    {
      title: '操作',
      width: 80,
      align: 'center',
      dataIndex: 'operation',
      visible: !readOnly,
      render: (t, r, i) => {
        return (
          <span
            style={{ color: '#ff4d4f', cursor: 'pointer' }}
            onClick={() => remove(i)}
          >
            删除
          </span>
        );
      },
    },
  ].filter(c => c.visible !== false);

  return (
    <div className={`${baseCls}-compete`}>
      <Table
        className={`${baseCls}-compete-table`}
        tableLayout="fixed"
        columns={columns}
        dataSource={value}
        pagination={false}
        {...rest}
      />
      {!readOnly && (
        <div className={`${baseCls}-compete-footer`}>
          <Button
            type="dashed"
            block
            onClick={() => add()}
            icon={<PlusOutlined />}
          >
            添加竞品
          </Button>
        </div>
      )}
    </div>
  );
}

export default {
  input: ValueInput,
  number: InputNumber,
  price: PriceInput,
  region: RegionSelect,
  product: ProductSelect,
  rangeDate: RangeDate,
  image: ImageUpload,
  compete: CompeteProduct,
}
