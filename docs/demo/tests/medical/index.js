import React, { useState } from 'react';
import { Divider } from 'antd';
import { MedicalEditor, Medical } from 'td-medical';

const Demo = () => {
  const [template, setTemplate] = useState([]);
  const [data, setData] = useState({});

  return (
    <React.Fragment>
      <Divider orientation="left">MedicalEditor</Divider>
      <MedicalEditor
        onFinish={(data) => {
          setTemplate(data);
        }}
      />
      <Divider orientation="left">Medical</Divider>
      <Medical
        backurl={false}
        template={template}
        onFinish={(values) => {
          setData(values);
        }}
      />
      <Divider orientation="left">Medical（readOnly）</Divider>
      <Medical
        readOnly
        backurl={false}
        data={data}
        template={template}
      />
    </React.Fragment>
  );
};

export default Demo;
