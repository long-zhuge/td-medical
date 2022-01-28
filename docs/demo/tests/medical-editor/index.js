import React from 'react';
import { MedicalEditor } from 'td-medical';
import { elementList } from './mock';

const Demo = () => {
  return (
    <MedicalEditor
      elementList={elementList}
    />
  );
};

export default Demo;
