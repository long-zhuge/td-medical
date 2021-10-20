import React from 'react';
import { MedicalTemplate } from 'td-medical';
import { elementList } from './mock';

const Demo = () => {
  return (
    <MedicalTemplate
      elementList={elementList}
    />
  );
};

export default Demo;
