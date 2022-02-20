/*
* 类型：form 表单类型
* */

import React, { useContext } from 'react';
import { Input, InputNumber, Cascader } from 'antd';
import SelectList from 'td-antd/es/select-list';
import DateEasily from 'td-antd/es/date-easily';
import TdUpload from 'td-antd/es/td-upload'
import tools from 'td-antd/es/tools';
import { Context } from '../index';

const { momentToString } = tools;

function ValueInput(props) {
  const { readOnly, initialValue, onChange, ...rest } = props;

  const handleChange = (e) => {
    onChange(e.target.value);
  }

  return (
    <Input
      {...rest}
      onChange={handleChange}
    />
  );
}

function PriceInput(props) {
  const { readOnly, initialValue, currency = '¥', ...rest } = props;

  return (
    <InputNumber
      {...rest}
      min={1}
      style={{ width: '100%' }}
      formatter={value => value && `${currency} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value && value.replace(new RegExp(`${currency}\\s?|(,*)`, 'g'), '')}
    />
  );
}

function RegionSelect(props) {
  const { pcas } = useContext(Context);
  const { readOnly, initialValue, ...rest } = props;

  return (
    <Cascader
      options={pcas}
      {...rest}
    />
  );
}

function ProductSelect(props) {
  const { productParam } = useContext(Context);
  const { readOnly, initialValue, ...rest } = props;

  return (
    <SelectList
      labelInValue
      url="/product/getPageList.json"
      defaultParams={productParam}
      fields={['productNo', 'productName']}
      {...rest}
    />
  );
}

function RangeDate(props) {
  const { readOnly, initialValue, value, onChange, ...rest } = props;

  const handleChange = (date) => {
    onChange(date && [momentToString(date[0]), momentToString(date[1])]);
  }

  return (
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

export default {
  input: ValueInput,
  number: InputNumber,
  price: PriceInput,
  region: RegionSelect,
  product: ProductSelect,
  rangeDate: RangeDate,
  image: ImageUpload,
}
