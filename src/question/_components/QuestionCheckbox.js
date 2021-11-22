/*
* 类型：checkbox 问卷多选
* */

import React from 'react';
import { Checkbox, Input } from 'antd';

const NO_INPUT_ERROR_MSG = '请填写其它说明内容';

export default function QuestionCheckbox(props) {
  const {
    options = [],
    readOnly = false,
    value = {},
    onChange,
    ...rest
  } = props;

  const handleChange = (optionNos) => {
    const inputOptionNo = options.find(o => o.optionType === 'input')?.optionNo;
    const inputOptionChecked = optionNos.includes(inputOptionNo);
    onChange({
      optionNos,
      skipQuestionNo: optionNos.length ? options.find(o => o.optionNo === optionNos[0]).skipQuestionNo : null,
      otherText: inputOptionChecked ? value.otherText : null,
      error: optionNos.length
        ? inputOptionChecked
          ? value.otherText?.[inputOptionNo] ? '' : NO_INPUT_ERROR_MSG
          : ''
        : '请完成本题目',
    });
  };

  const handleInput = (optionNo, e) => {
    const inputValue = e.target.value;
    onChange({
      ...value,
      otherText: { [optionNo]: inputValue },
      error: inputValue ? '' : NO_INPUT_ERROR_MSG,
    });
  }

  return (
    <Checkbox.Group
      disabled={readOnly}
      value={value.optionNos}
      onChange={handleChange}
      {...rest}
    >
      {options.map(o => (
        <div key={o.optionNo}>
          <Checkbox value={o.optionNo}>
            <div className="td-medical-question-checkbox-option">
              <span>{o.optionName}</span>
              {o.optionType === 'input' ? (
                <Input
                  style={{ minWidth: 240 }}
                  value={value.otherText?.[o.optionNo]}
                  disabled={!value.optionNos?.includes(o.optionNo)}
                  onChange={handleInput.bind(null, o.optionNo)}
                />
              ) : null}
            </div>
          </Checkbox>
        </div>
      ))}
    </Checkbox.Group>
  );
}
