import React from 'react';
import { Medical } from 'td-medical';
import templateJson from './mock';

const Demo = () => {
  return (
    <Medical
      template={templateJson}
      onFinish={(values) => {
        console.log(values);
      }}
    />
  );
};

export default Demo;
