const elementList = [
  {
    elementNo: "E00001",
    modeEn: "base",
    modeCn: "基本信息",
    "fieldList": [{
      "fieldNo": "F00001",
      "cn": "病历号",
      "en": "medicalNumber",
      "meddra": "",
      "inputType": "text",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=medicalNumber",
      "valueType": "object",
    }, {
      "fieldNo": "F00002",
      "cn": "姓名",
      "en": "name",
      "meddra": "",
      "inputType": "text",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=name",
      "valueType": "object",
    }, {
      "fieldNo": "F00003",
      "cn": "性别",
      "en": "sex",
      "meddra": "",
      "inputType": "select",
      "map": "男#女",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=sex",
      "valueType": "object",
    }, {
      "fieldNo": "F00004",
      "cn": "民族",
      "en": "nation",
      "meddra": "",
      "inputType": "text",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=nation",
      "valueType": "object",
    }, {
      "fieldNo": "F00005",
      "cn": "出生日期",
      "en": "birthDate",
      "meddra": "",
      "inputType": "date",
      "map": "",
      "unit": "",
      "rule": "YYYY-MM-DD",
      "ruleMessage": "",
      "valueToName": "value1=birthDate",
      "valueType": "object",
    }, {
      "fieldNo": "F00006",
      "cn": "费别",
      "en": "costType",
      "meddra": "",
      "inputType": "select",
      "map": "市级医保#省级医保#自费",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=costType",
      "valueType": "object",
    }, {
      "fieldNo": "F00007",
      "cn": "地址",
      "en": "adress",
      "meddra": "",
      "inputType": "text",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=adress",
      "valueType": "object",
    }, {
      "fieldNo": "F00008",
      "cn": "科室",
      "en": "hospitalDepartments",
      "meddra": "",
      "inputType": "hospital_departments",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=hospitalDepartments",
      "valueType": "object",
    }, {
      "fieldNo": "F00009",
      "cn": "就诊日期",
      "en": "visitDate",
      "meddra": "",
      "inputType": "date",
      "map": "",
      "unit": "",
      "rule": "YYYY-MM-DD",
      "ruleMessage": "",
      "valueToName": "value1=visitDate",
      "valueType": "object",
    }, {
      "fieldNo": "F00010",
      "cn": "联系电话",
      "en": "phone",
      "meddra": "",
      "inputType": "text",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=phone",
      "valueType": "object",
    }, {
      "fieldNo": "F00011",
      "cn": "身高",
      "en": "height",
      "meddra": "",
      "inputType": "number",
      "map": "",
      "unit": "cm",
      "rule": "^//d+(//.//d+)?$",
      "ruleMessage": "必须是大于或等于零的值",
      "valueToName": "value1=height",
      "valueType": "object",
    }, {
      "fieldNo": "F00012",
      "cn": "体重",
      "en": "weight",
      "meddra": "",
      "inputType": "number",
      "map": "",
      "unit": "kg",
      "rule": "^//d+(//.//d+)?$",
      "ruleMessage": "必须是大于或等于零的值",
      "valueToName": "value1=weight",
      "valueType": "object",
    }],
  },
  {
    "elementNo": "E00002",
    "modeEn": "outpatientContent",
    "modeCn": "门诊主体",
    "fieldList": [{
      "fieldNo": "F00013",
      "cn": "主诉",
      "en": "ccph",
      "meddra": "",
      "inputType": "textarea",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=ccph",
      "valueType": "object"
    }, {
      "fieldNo": "F00014",
      "cn": "诊断",
      "en": "diagnosis",
      "meddra": "",
      "inputType": "textarea",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=diagnosis",
      "valueType": "object"
    }, {
      "fieldNo": "F00015",
      "cn": "现病史",
      "en": "medicalHistory",
      "meddra": "",
      "inputType": "textarea",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=medicalHistory",
      "valueType": "object"
    }, {
      "fieldNo": "F00016",
      "cn": "诊疗意见",
      "en": "opinion",
      "meddra": "",
      "inputType": "textarea",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=opinion",
      "valueType": "object"
    }, {
      "fieldNo": "F00017",
      "cn": "检验检查",
      "en": "inspect",
      "meddra": "",
      "inputType": "textarea",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=inspect",
      "valueType": "object"
    }, {
      "fieldNo": "F00018",
      "cn": "医生",
      "en": "doctor",
      "meddra": "",
      "inputType": "text",
      "map": "",
      "unit": "",
      "rule": "",
      "ruleMessage": "",
      "valueToName": "value1=doctor",
      "valueType": "object"
    }, {
      "fieldNo": "F00019",
      "cn": "诊疗时间",
      "en": "diagnosisDate",
      "meddra": "",
      "inputType": "datetime",
      "map": "",
      "unit": "",
      "rule": "YYYY-MM-DD hh:mm:ss",
      "ruleMessage": "",
      "valueToName": "value1=diagnosisDate",
      "valueType": "object"
    }]
  }
];

export { elementList };
