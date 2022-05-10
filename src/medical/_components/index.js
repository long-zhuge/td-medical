import React from 'react';

import Cascader from './Cascader';
import Date from './Date';
import Number from './Number';
import NumberDouble from './NumberDouble';
import Select from './Select';
import Text from './Text';
import Radio from './Radio';

export const ele = {
  cascader: Cascader,
  date: Date,
  month: Date,
  datetime: Date,
  number: Number,
  number_unit: Number,
  number_double: NumberDouble,
  select: Select,
  select_multiple: Select,
  text: Text,
  textarea: Text,
};

const EleFormItem = (props) => {
  const Component = ele[props.inputType];

  if (Component) {
    return <Component {...props} />;
  }

  return null;
};

export {
  Cascader,
  Date,
  Number,
  NumberDouble,
  Select,
  Text,
  EleFormItem,
  Radio,
}
