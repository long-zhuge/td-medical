/*
* 类型：form 表单类型
* */

import React, { useContext, useRef } from 'react';
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
  const { productUrl } = useContext(Context);
  const { readOnly, initialValue, ...rest } = props;

  return (
    <SelectList
      url={productUrl}
      {...rest}
    />
  );
}

function RangeDate(props) {
  const { readOnly, initialValue, value, onChange, ...rest } = props;

  const handleChange = (date) => date && [momentToString(date[0]), momentToString(date[1])]

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
  const uploadRef = useRef();
  const { uploadUrl } = useContext(Context);

  return (
    <TdUpload
      hidden={readOnly}
      hideRemoveBtn={readOnly}
      url={uploadUrl}
      ref={uploadRef}
      fileTypes={['image']}
      isPreview
      listType="picture-card"
      isImageUrl={() => true}
      initial={initialValue?.split(',').map(item => item)}
      onChange={onChange}
      filterOptions={(item) => {
        return {
          uid: item,
          name: item,
          url: item,
        };
      }}
      callback={(status, file, files, onUpload) => {
        if (status === 'after') {
          onUpload();
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
