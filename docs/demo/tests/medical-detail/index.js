import React from 'react';
import { Medical } from 'td-medical';
import templateJson from './mock';

const data = {"scoreLife_0":{"cnName":"评分","enName":"scoreLife","fieldNo":"F00067","inputType":"radio","map":"","meddra":"","remarks":"","rule":"","unit":"","valueToName":"value1=scoreLife","valueType":"object","required":true,"values":{"order":0,"scoreLife":"80"}},"grade_1":{"cnName":"分级","enName":"grade","fieldNo":"F00068","inputType":"radio","map":"","meddra":"","remarks":"","rule":"","unit":"","valueToName":"value1=grade","valueType":"object","required":true,"values":{"order":0,"grade":"1"}},"grade_2":{"cnName":"分级","enName":"grade","fieldNo":"F00068","inputType":"radio","map":"","meddra":"","remarks":"","rule":"","unit":"","valueToName":"value1=grade","valueType":"object","required":true,"values":{"order":0,"grade":"2"}},"grade_3":{"cnName":"分级","enName":"grade","fieldNo":"F00068","inputType":"radio","map":"","meddra":"","remarks":"","rule":"","unit":"","valueToName":"value1=grade","valueType":"object","required":true,"values":{"order":0,"grade":"3"}}};

const Demo = () => {
  return (
    <Medical
      readOnly
      template={templateJson}
      data={data}
    />
  );
};

export default Demo;
