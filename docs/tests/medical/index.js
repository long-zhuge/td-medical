import React from 'react';
import { MedicalForm } from 'td-medical';
import templateJson from './mock';

const Demo = () => {
  return (
    <MedicalForm
      template={templateJson}
      onFinish={(values) => {
        console.log(values);
      }}
    />
  );
};

export default Demo;
