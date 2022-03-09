/*
* 类型：radio 问卷单选
* */

import React from 'react';
import { Radio, Input } from 'antd';

const NO_INPUT_ERROR_MSG = '请填写内容';
const baseCls = 'td-medical-question-radio';

export default function QuestionRadio(props) {
  const {
    options = [],
    readOnly = false,
    value = {},
    onChange,
  } = props;

  const handleChange = (e) => {
    const inputOptionNos = options.filter(o => o.optionType === 'input').map(o => o.optionNo);
    const optionNo = e.target.value;
    onChange(
      { [optionNo]: value[optionNo] || '' },
      options.find(o => o.optionNo === optionNo).skipQuestionNo,
      inputOptionNos.includes(optionNo) && !value[optionNo] ? NO_INPUT_ERROR_MSG : ''
    );
  };

  const handleInput = (option, e) => {
    const { optionNo, skipQuestionNo } = option;
    const inputValue = e.target.value;
    onChange(
      { [optionNo]: inputValue },
      skipQuestionNo,
      inputValue ? '' : NO_INPUT_ERROR_MSG,
    );
  }

  const renderOtherText = (o) => {
    const text = value[o.optionNo];
    const inputConfig = o.remark ? JSON.parse(o.remark) : null;
    if (readOnly) {
      return <span className={`${baseCls}-option-text`}>{text}</span>;
    }
    return o.optionType === 'input' ? (
      <span>
        <Input
          style={{ minWidth: 220 }}
          value={text}
          disabled={!Object.keys(value).includes(o.optionNo)}
          onChange={handleInput.bind(null, o)}
          {...inputConfig}
        />
      </span>
    ) : null;
  }

  return (
    <Radio.Group
      value={Object.keys(value)[0]}
      onChange={readOnly ? null : handleChange}
    >
      {options.map(o => (
        <div key={o.optionNo} className={`${baseCls}-option`}>
          <Radio key={o.optionNo} value={o.optionNo}>{o.optionName}</Radio>
          {renderOtherText(o)}
        </div>
      ))}
    </Radio.Group>
  );
}
