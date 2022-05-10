import React, {useState} from 'react';
import {Divider} from 'antd';
import {MedicalEditor, Medical} from 'td-medical';
import {clone} from 'td-medical/_util';
import dept from './dept.json';
import region from './region.json';

const Demo = () => {
  const [template, setTemplate] = useState([{"id":"158770","template":[{"cnName":"基本信息","elementNo":"E00001","method":"default","enName":"base","fieldList":[{"cnName":"术后不良反应","enName":"postoperativeAdverseReactions","fieldNo":"F00070","inputType":"select","map":"有#无","valueToName":"value1=postoperativeAdverseReactions","valueType":"object","required":true,"disabled":false},{"cnName":"具体不良反应","enName":"specificAdverseReactions","fieldNo":"F00071","inputType":"select_multiple","map":"潮热#盗汗#阴道干涩#头痛#阴道出血#易怒等情绪改变#其他","valueToName":"value1=specificAdverseReactions","valueType":"object","required":true,"disabled":false}]}],"templateName":"1"}])
  const [data, setData] = useState([{"templateOrder":"0","postoperativeAdverseReactions_0":{"cnName":"术后不良反应","enName":"postoperativeAdverseReactions","fieldNo":"F00070","inputType":"select","map":"有#无","valueToName":"value1=postoperativeAdverseReactions","valueType":"object","required":true,"disabled":false,"values":{"order":0,"postoperativeAdverseReactions":"有"}},"specificAdverseReactions_0":{"cnName":"具体不良反应","enName":"specificAdverseReactions","fieldNo":"F00071","inputType":"select_multiple","map":"潮热#盗汗#阴道干涩#头痛#阴道出血#易怒等情绪改变#其他","valueToName":"value1=specificAdverseReactions","valueType":"object","required":true,"disabled":false,"values":{"order":0,"specificAdverseReactions":"潮热,盗汗,阴道干涩"}}}])

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
          console.log('values：', JSON.stringify([
            {
              templateOrder,
              ...values,
            },
          ]));

          let is;

          const d = data.reduce((p, c) => {
            if (+c.templateOrder === +templateOrder) {
              is = true;
              return [...p, {...c, ...values}]
            }

            return [...p, c];
          }, []);

          const nowData = is ? clone(d) : [...d, {...values, templateOrder}];
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
