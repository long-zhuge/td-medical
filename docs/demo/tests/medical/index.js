import React, {useState} from 'react';
import {Divider} from 'antd';
import {MedicalEditor, Medical} from 'td-medical';
import {clone} from 'td-medical/_util';
import dept from './dept.json';
import region from './region.json';

const Demo = () => {
  const [template, setTemplate] = useState([{
    "id": "5e999e",
    "template": [{
      "cnName": "基本信息",
      "elementNo": "E00001",
      "method": "default",
      "enName": "base",
      "remarks": "备注信息显示",
      "fieldList": [{
        "cnName": "病历号",
        "enName": "medicalNumber",
        "fieldNo": "F00001",
        "inputType": "text",
        "valueToName": "value1=medicalNumber",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "姓名",
        "enName": "name",
        "fieldNo": "F00002",
        "inputType": "text",
        "valueToName": "value1=name",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "性别",
        "enName": "sex",
        "fieldNo": "F00003",
        "inputType": "select",
        "map": "男#女",
        "valueToName": "value1=sex",
        "valueType": "object",
        "required": true,
        "analysis": true
      }, {
        "cnName": "民族",
        "enName": "nation",
        "fieldNo": "F00004",
        "inputType": "select",
        "map": "汉族#壮族#满族#回族#苗族#维吾尔族#土家族#彝族#蒙古族#藏族#布依族#侗族#瑶族#朝鲜族#白族#哈尼族#哈萨克族#黎族#傣族#畲族#傈僳族#仡佬族#东乡族#高山族#拉祜族#水族#佤族#纳西族#羌族#土族#仫佬族#锡伯族#柯尔克孜族#达斡尔族#景颇族#毛南族#撒拉族#布朗族#塔吉克族#阿昌族#普米族#鄂温克族#怒族#京族#基诺族#德昂族#保安族#俄罗斯族#裕固族#乌孜别克族#门巴族#鄂伦春族#独龙族#塔塔尔族#赫哲族#珞巴族",
        "valueToName": "value1=nation",
        "valueType": "object",
        "required": true,
        "analysis": true
      }, {
        "cnName": "出生年月",
        "enName": "birthDate",
        "fieldNo": "F00005",
        "inputType": "month",
        "valueToName": "value1=birthDate",
        "valueType": "object",
        "required": true,
        "analysis": true
      }, {
        "cnName": "费别",
        "enName": "costType",
        "fieldNo": "F00006",
        "inputType": "select",
        "map": "市级医保#省级医保#自费",
        "valueToName": "value1=costType",
        "valueType": "object",
        "required": true,
        "analysis": true
      }, {
        "cnName": "地区",
        "enName": "region",
        "fieldNo": "F00017",
        "inputType": "cascader",
        "valueToName": "value1=region",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "地址",
        "enName": "adress",
        "fieldNo": "F00007",
        "inputType": "text",
        "valueToName": "value1=adress",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "就诊科室",
        "enName": "hospitalDepartments",
        "fieldNo": "F00008",
        "inputType": "cascader",
        "valueToName": "value1=hospitalDepartments",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "就诊日期",
        "enName": "visitDate",
        "fieldNo": "F00009",
        "inputType": "date",
        "valueToName": "value1=visitDate",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "联系电话",
        "enName": "phone",
        "fieldNo": "F00010",
        "inputType": "text",
        "valueToName": "value1=phone",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "身高",
        "enName": "height",
        "fieldNo": "F00011",
        "inputType": "number",
        "unit": "cm",
        "valueToName": "value1=height",
        "valueType": "object",
        "required": true,
        "analysis": true
      }, {
        "cnName": "体重",
        "enName": "weight",
        "fieldNo": "F00012",
        "inputType": "number",
        "unit": "kg",
        "valueToName": "value1=weight",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "婚姻状况",
        "enName": "maritalState",
        "fieldNo": "F00013",
        "inputType": "radio",
        "map": "已婚#未婚",
        "valueToName": "value1=maritalState",
        "valueType": "object",
        "required": true,
        "analysis": true
      }, {
        "cnName": "病程",
        "enName": "courseOfDisease",
        "fieldNo": "F00014",
        "inputType": "number",
        "unit": "月",
        "valueToName": "value1=courseOfDisease",
        "valueType": "object",
        "required": true,
        "analysis": true
      }, {
        "cnName": "重要既往史",
        "enName": "medicationHistory",
        "fieldNo": "F00015",
        "inputType": "radio_desc",
        "map": "有#无",
        "valueToName": "value1=medicationHistory,value2=medicationHistory_desc",
        "valueType": "object",
        "required": true
      }, {
        "cnName": "诊断",
        "enName": "diagnosis",
        "fieldNo": "F00016",
        "inputType": "textarea",
        "valueToName": "value1=diagnosis",
        "valueType": "object",
        "required": true
      }]
    }],
    "templateName": "1"
  }])
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
