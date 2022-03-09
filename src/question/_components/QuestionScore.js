/*
* 类型：score 问卷分数选择
* */

import React from 'react';
import cx from 'classnames';

const baseCls = 'td-medical-question-score';

export default function QuestionScore(props) {
  const {
    options = [],
    readOnly = false,
    value = {},
    onChange,
  } = props;

  const valueIdx = options.findIndex(o => o.optionNo === Object.keys(value)[0]);

  const handleChange = (optionNo) => {
    onChange(
      { [optionNo]: '' },
      options.find(o => o.optionNo === optionNo).skipQuestionNo,
    );
  };

  return (
    <div
      className={baseCls}
      style={{
        maxWidth: 40 * options.length,
      }}
    >
      <ul className={`${baseCls}-list`}>
        {options.map((o, idx) => (
          <li
            key={o.optionNo}
            className={cx(`${baseCls}-list-item`, valueIdx >= idx && `${baseCls}-list-item_active`)}
            onClick={readOnly ? null : handleChange.bind(null, o.optionNo)}
          >
            {o.optionName?.match(/^\d+/)?.[0] || idx}
          </li>
        ))}
      </ul>
      <div className={`${baseCls}-remark`}>
        {options.map(o => (o.remark ? <span key={o.optionNo}>{o.remark}</span> : null))}
      </div>
    </div>
  );
}
