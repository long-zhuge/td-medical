import React from 'react';

import Cascader from './Cascader';
import CheckBox from './CheckBox';
import Date from './Date';
import Number from './Number';
import NumberUnit from './NumberUnit';
import NumberDouble from './NumberDouble';
import Radio from './Radio';
import Select from './Select';
import SelectDesc from './SelectDesc';
import Text from './Text';
import Textarea from './Textarea';

export const ele = {
  cascader: Cascader,
  checkbox: CheckBox,
  date: Date,
  month: Date,
  datetime: Date,
  number: Number,
  number_unit: NumberUnit,
  number_double: NumberDouble,
  radio: Radio,
  select: Select,
  select_desc: SelectDesc,
  text: Text,
  textarea: Textarea,
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
  CheckBox,
  Date,
  Number,
  NumberUnit,
  NumberDouble,
  Radio,
  Select,
  SelectDesc,
  Text,
  Textarea,
  EleFormItem,
}
