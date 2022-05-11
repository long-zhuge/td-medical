import React, {useState} from 'react';
import {Divider} from 'antd';
import {MedicalEditor, Medical} from 'td-medical';
import {clone} from 'td-medical/_util';
import dept from './dept.json';
import region from './region.json';

const Demo = () => {
  const [template, setTemplate] = useState([{
    "id": "6058ca",
    "template": [{
      "cnName": "生活质量评分改善",
      "elementNo": "E00020",
      "method": "special",
      "enName": "IQLS",
      "remarks": "对以下10道题进行影响程度的判断和评分：\n极严重影响计为3分；\n严重影响计为2分；\n轻微影响计为1分；\n没有影响计为0分",
      "fieldList": [{
        "cnName": "您是否有皮肤“发痒”或“疼痛”的感觉？",
        "enName": "IQLS-0",
        "fieldNo": "F01900",
        "inputType": "number",
        "valueToName": "value1=IQLS-0_before,value2=IQLS-0_after",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "您是否因为皮肤问题而产生“尴尬”、“沮丧”、“难过”？",
        "enName": "IQLS-1",
        "fieldNo": "F01901",
        "inputType": "number",
        "valueToName": "value1=IQLS-1_before,value2=IQLS-1_after",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "您是否因为皮肤不适而选择不同或特殊的衣服、鞋子？",
        "enName": "IQLS-2",
        "fieldNo": "F01902",
        "inputType": "number",
        "valueToName": "value1=IQLS-2_before,value2=IQLS-2_after",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "您的皮肤问题是否影响您的外出活动或娱乐？",
        "enName": "IQLS-3",
        "fieldNo": "F01903",
        "inputType": "number",
        "valueToName": "value1=IQLS-3_before,value2=IQLS-3_after",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "您是否因为皮肤问题而影响您做运动？",
        "enName": "IQLS-4",
        "fieldNo": "F01904",
        "inputType": "number",
        "valueToName": "value1=IQLS-4_before,value2=IQLS-4_after",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "您的皮肤问题是否影响您读书？",
        "enName": "IQLS-5",
        "fieldNo": "F01905",
        "inputType": "number",
        "valueToName": "value1=IQLS-5_before,value2=IQLS-5_after",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "您的皮肤问题是否影响您和朋友、亲戚之间的关系？",
        "enName": "IQLS-6",
        "fieldNo": "F01906",
        "inputType": "number",
        "valueToName": "value1=IQLS-6_before,value2=IQLS-6_after",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "您是否因为皮肤问题影响睡眠？",
        "enName": "IQLS-7",
        "fieldNo": "F01907",
        "inputType": "number",
        "valueToName": "value1=IQLS-7_before,value2=IQLS-7_after",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "您的皮肤问题是否造成日常生活上的不便？",
        "enName": "IQLS-8",
        "fieldNo": "F01908",
        "inputType": "number",
        "valueToName": "value1=IQLS-8_before,value2=IQLS-8_after",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "在过去的一星期中，因为皮肤的问题，他人骂您，嘲笑您、欺负您、问您问题或躲避您，这种困扰的程度如何？",
        "enName": "IQLS-9",
        "fieldNo": "F01909",
        "inputType": "number",
        "valueToName": "value1=IQLS-9_before,value2=IQLS-9_after",
        "valueType": "object",
        "required": true
      }]
    }],
    "templateName": "1"
  }])
  const [data, setData] = useState([{
    "templateOrder": "0",
    "IQLS-0_0": {
      "cnName": "您是否有皮肤“发痒”或“疼痛”的感觉？",
      "enName": "IQLS-0",
      "fieldNo": "F01900",
      "inputType": "number",
      "valueToName": "value1=IQLS-0_before,value2=IQLS-0_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-0_before": "1", "IQLS-0_after": "2"}
    },
    "IQLS-1_0": {
      "cnName": "您是否因为皮肤问题而产生“尴尬”、“沮丧”、“难过”？",
      "enName": "IQLS-1",
      "fieldNo": "F01901",
      "inputType": "number",
      "valueToName": "value1=IQLS-1_before,value2=IQLS-1_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-1_before": "1", "IQLS-1_after": "2"}
    },
    "IQLS-2_0": {
      "cnName": "您是否因为皮肤不适而选择不同或特殊的衣服、鞋子？",
      "enName": "IQLS-2",
      "fieldNo": "F01902",
      "inputType": "number",
      "valueToName": "value1=IQLS-2_before,value2=IQLS-2_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-2_before": "1", "IQLS-2_after": "2"}
    },
    "IQLS-3_0": {
      "cnName": "您的皮肤问题是否影响您的外出活动或娱乐？",
      "enName": "IQLS-3",
      "fieldNo": "F01903",
      "inputType": "number",
      "valueToName": "value1=IQLS-3_before,value2=IQLS-3_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-3_before": "1", "IQLS-3_after": "2"}
    },
    "IQLS-4_0": {
      "cnName": "您是否因为皮肤问题而影响您做运动？",
      "enName": "IQLS-4",
      "fieldNo": "F01904",
      "inputType": "number",
      "valueToName": "value1=IQLS-4_before,value2=IQLS-4_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-4_before": "1", "IQLS-4_after": "2"}
    },
    "IQLS-5_0": {
      "cnName": "您的皮肤问题是否影响您读书？",
      "enName": "IQLS-5",
      "fieldNo": "F01905",
      "inputType": "number",
      "valueToName": "value1=IQLS-5_before,value2=IQLS-5_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-5_before": "1", "IQLS-5_after": "2"}
    },
    "IQLS-6_0": {
      "cnName": "您的皮肤问题是否影响您和朋友、亲戚之间的关系？",
      "enName": "IQLS-6",
      "fieldNo": "F01906",
      "inputType": "number",
      "valueToName": "value1=IQLS-6_before,value2=IQLS-6_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-6_before": "1", "IQLS-6_after": "2"}
    },
    "IQLS-7_0": {
      "cnName": "您是否因为皮肤问题影响睡眠？",
      "enName": "IQLS-7",
      "fieldNo": "F01907",
      "inputType": "number",
      "valueToName": "value1=IQLS-7_before,value2=IQLS-7_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-7_before": "1", "IQLS-7_after": "2"}
    },
    "IQLS-8_0": {
      "cnName": "您的皮肤问题是否造成日常生活上的不便？",
      "enName": "IQLS-8",
      "fieldNo": "F01908",
      "inputType": "number",
      "valueToName": "value1=IQLS-8_before,value2=IQLS-8_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-8_before": "1", "IQLS-8_after": "2"}
    },
    "IQLS-9_0": {
      "cnName": "在过去的一星期中，因为皮肤的问题，他人骂您，嘲笑您、欺负您、问您问题或躲避您，这种困扰的程度如何？",
      "enName": "IQLS-9",
      "fieldNo": "F01909",
      "inputType": "number",
      "valueToName": "value1=IQLS-9_before,value2=IQLS-9_after",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "IQLS-9_before": "1", "IQLS-9_after": "2"}
    }
  }])

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
