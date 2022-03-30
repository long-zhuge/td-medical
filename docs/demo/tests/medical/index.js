import React, {useState} from 'react';
import {Divider} from 'antd';
import {MedicalEditor, Medical} from 'td-medical';
import {clone} from 'td-medical/_util';
import dept from './dept.json';
import region from './region.json';

const Demo = () => {
  const [template, setTemplate] = useState([])
  const [data, setData] = useState([])

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
        data={data} // 表单回显数据
        dept={dept}
        region={region}
        backurl={false}
        template={template}
        submitButtonProps={{children: '提交本页'}}
        onFinish={(type, values, templateOrder) => {
          console.log('type：', type);
          console.log('templateOrder：', templateOrder);
          console.log('values：', JSON.stringify(values));

          let is;

          const d = data.reduce((p, c) => {
            if (+c.templateOrder === +templateOrder) {
              is = true;
              return [...p, {...c, ...values}]
            }

            return [...p, c];
          }, []);

          const nowData = is ? clone(d) : [...d, { ...values, templateOrder }];
          setData(nowData);
        }}
      />
      <Divider orientation="left">Medical（readOnly）</Divider>
      <Medical
        readOnly
        data={data}
        dept={dept}
        region={region}
        backurl={false}
        template={template}
      />
    </React.Fragment>
  );
}

export default Demo;
