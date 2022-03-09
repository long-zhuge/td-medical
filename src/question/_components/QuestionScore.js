/*
* 类型：score 问卷分数选择
* */

import React, { forwardRef } from 'react';
import { Radio } from 'antd';

function QuestionScore(props, ref) {
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
    <div className="td-medical-question-score">
      <Radio.Group
        ref={ref}
        buttonStyle="solid"
        value={Object.keys(value)[0]}
        onChange={readOnly ? null : handleChange}
      >
        {options.map(o => (
          <Radio.Button key={o.optionNo} value={o.optionNo}>{o.optionName}</Radio.Button>
        ))}
      </Radio.Group>
      <div className="td-medical-question-score-remark">
        {options.map(o => (o.remark ? <span key={o.optionNo}>{o.remark}</span> : null))}
      </div>
    </div>
  );
}

export default forwardRef(QuestionScore);
