import React from 'react';
import { Medical } from 'td-medical';
import templateJson from './mock';

const Demo = () => {
  return (
    <Medical
      readOnly
      template={templateJson}
      data={{"scoreLife_0":{"cnName":"评分","enName":"scoreLife","fieldNo":"F00067","inputType":"radio","map":"","meddra":"","remarks":"","rule":"","unit":"","valueToName":"value1=scoreLife","valueType":"object","required":true,"values":{"order":0,"scoreLife":"70"}}}}
      onFinish={(values) => {
        console.log(JSON.stringify(values));
      }}
    />
  );
};

export default Demo;
