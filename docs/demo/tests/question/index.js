import React from 'react';
import { Question } from 'td-medical';
import questionsData from './mock';

const Demo = () => {
  return (
    <Question
      questionBankName="问卷调查"
      questions={questionsData}
      onFinish={(values) => {
        console.log(values);
      }}
    />
  );
};

export default Demo;
