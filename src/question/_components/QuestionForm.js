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
    initialValue = {},
    value = {},
    onChange,
  } = props;

  const handleChange = (option, optionValue, error) => {
    onChange(
      { ...value, [option.optionNo]: optionValue },
      option.skipQuestionNo,
      error
    );
  };

  return (
    <div className={baseCls}>
      {options.map(o => {
        const formInitialValue = initialValue[o.optionNo];
        const formValue = value[o.optionNo];
        const formConfig = o.remark ? JSON.parse(o.remark) : null;
        return (
          <div key={o.optionNo} className={`${baseCls}-item`}>
            {o.optionName ? <span className={`${baseCls}-item-label`}>{`${o.optionName}：`}</span> : null}
            <div className={`${baseCls}-item-content`}>
              {React.createElement(
                FORM_TYPE[o.optionType],
                {
                  initialValue: formInitialValue,
                  value: formValue,
                  onChange: handleChange.bind(null, o),
                  readOnly,
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
