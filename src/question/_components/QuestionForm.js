/*
* 类型：form 表单填写
* */

import React from 'react';
import FORM_TYPE from './QuestionFormType';

const baseCls = 'td-medical-question-form';

export default function QuestionForm(props) {
  const {
    options = [],
    readOnly = false,
    initialValue,
    value = {},
    onChange,
  } = props;

  const handleChange = (option, optionValue) => {
    onChange(
      { ...value, [option.optionNo]: optionValue },
      option.skipQuestionNo
    );
  };

  return (
    <div className={baseCls}>
      {options.map(o => {
        const formValue = value[o.optionNo];
        const formConfig = o.remark ? JSON.parse(o.remark) : null;
        return (
          <div key={o.optionNo} className={`${baseCls}-item`}>
            <span className={`${baseCls}-item-label`}>{`${o.optionName}：`}</span>
            <div className={`${baseCls}-item-content`}>
              {React.createElement(
                FORM_TYPE[o.optionType],
                {
                  initialValue,
                  value: formValue,
                  onChange: handleChange.bind(null, o),
                  readOnly,
                  disabled: readOnly,
                  ...formConfig,
                },
              )}
            </div>
          </div>
        )
      })}
    </div>
  );
}
