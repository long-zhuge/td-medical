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
        onFinish={(temp) => {
          setTemplate(temp);
          console.log(JSON.stringify(temp));
        }}
      />
      <Divider orientation="left">Medical</Divider>
      <Medical
        // data={} // 表单回显数据
        backurl={false}
        template={template}
        onFinish={(values) => {
          setData(values);
          console.log(JSON.stringify(values));
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
