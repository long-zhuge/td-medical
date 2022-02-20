/*
* 类型：checkbox 问卷多选
* */

import React from 'react';
import { Checkbox, Input } from 'antd';

const NO_INPUT_ERROR_MSG = '请填写其它说明内容';
const baseCls = 'td-medical-question-checkbox';

export default function QuestionCheckbox(props) {
  const {
    options = [],
    readOnly = false,
    value = {},
    onChange,
  } = props;

  const handleChange = (optionNos) => {
    const inputOptionNos = options.filter(o => o.optionType === 'input').map(o => o.optionNo);
    let error;
    const questionValue = optionNos.reduce((obj, no) => {
      if (inputOptionNos.includes(no) && !value[no]) {
        error = NO_INPUT_ERROR_MSG;
      }
      return { ...obj, [no]: value[no] || '' };
    }, {});
    onChange(
      questionValue,
      optionNos.length ? options.find(o => o.optionNo === optionNos[0]).skipQuestionNo : null,
      optionNos.length ? error : '请先完成本题',
    );
  };

  const handleInput = (option, e) => {
    const { optionNo, skipQuestionNo } = option;
    const inputValue = e.target.value;
    onChange(
      { ...value, [optionNo]: inputValue },
      skipQuestionNo,
      inputValue ? '' : NO_INPUT_ERROR_MSG,
    );
  }

  const renderOtherText = (o) => {
    const text = value[o.optionNo];
    if (readOnly) {
      return <span className={`${baseCls}-option-text`}>{text}</span>;
    }
    return o.optionType === 'input' ? (
      <Input
        style={{ minWidth: 240 }}
        value={text}
        disabled={!Object.keys(value).includes(o.optionNo)}
        onChange={handleInput.bind(null, o)}
      />
    ) : null;
  }

  return (
    <Checkbox.Group
      disabled={readOnly}
      value={Object.keys(value)}
      onChange={handleChange}
    >
      {options.map(o => (
        <div key={o.optionNo}>
          <Checkbox value={o.optionNo}>
            <div className={`${baseCls}-option`}>
              <span>{o.optionName}</span>
              {renderOtherText(o)}
            </div>
          </Checkbox>
        </div>
      ))}
    </Checkbox.Group>
  );
}
