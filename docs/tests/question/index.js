import React from 'react';
import { QuestionForm } from 'td-medical';
import questionsData from './mock';

const Demo = () => {
  return (
    <QuestionForm
      questionBankName="问卷调查"
      questions={questionsData}
      onFinish={(values) => {
        console.log(values);
      }}
    />
  );
};

export default Demo;
