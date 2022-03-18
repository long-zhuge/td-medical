import React, {useState} from 'react';
import {Divider} from 'antd';
import {MedicalEditor, Medical} from 'td-medical';
import {clone} from 'td-medical/_util';

const Demo = () => {
  const [template, setTemplate] = useState([]);
  const [data, setData] = useState([]);

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
        backurl={false}
        template={template}
        onFinish={(type, values, templateOrder) => {
          console.log('type：', type);
          console.log('values：', JSON.stringify(values));
          console.log('templateOrder：', templateOrder);

          let is;

          const d = data.reduce((p, c) => {
            if (+c.templateOrder === +templateOrder) {
              is = true;
              return [...p, {...c, ...values}]
            }

            return [...p, c];
          }, []);

          if (is) {
            setData(clone(d))
          } else {
            setData([...d, {
              templateOrder,
              ...values,
            }]);
          }
        }}
      />
      <Divider orientation="left">Medical（readOnly）</Divider>
      <Medical
        readOnly
        data={data}
        backurl={false}
        template={template}
      />
    </React.Fragment>
  );
};

export default Demo;
