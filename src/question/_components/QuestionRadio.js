/*
* 类型：radio 问卷单选
* */

import React from 'react';
import { Radio } from 'antd';

export default function QuestionRadio(props) {
  const {
    options = [],
    readOnly = false,
    value = {},
    onChange,
  } = props;

  const handleChange = (e) => {
    const optionNo = e.target.value;
    onChange(
      { [optionNo]: '' },
      options.find(o => o.optionNo === optionNo).skipQuestionNo,
    );
  };

  return (
    <Radio.Group
      disabled={readOnly}
      value={Object.keys(value)[0]}
      onChange={handleChange}
    >
      {options.map(o => (
        <Radio key={o.optionNo} value={o.optionNo}>{o.optionName}</Radio>
      ))}
    </Radio.Group>
  );
}
