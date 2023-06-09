---
sidemenu: false
nav:
  title: API
---

## Medical

病历表单组件，可以将 json 模板数据渲染成病历表单

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|readOnly|只读，等于true时，会渲染成详情页模式|Boolean|false|
|template|渲染所需的数据，必传|Array|-|
|data|所有回显数据，[查看格式](/api#data-数据格式)|Array|-|
|onFinish|点击提交的回调函数<br />`type = submit(提交) / draft(草稿)`|Function(type`<String>`, values`<Object>`, templateOrder`<Number>`)|-|
|dept|科室数据|Array|-|
|region|省市县数据|Array|-|
|backurl|返回按钮的地址，值为 false 时不显示按钮|String|-|
|footerHidden|隐藏操作按钮|Boolean|false|
|onTabsChange|切换选项卡的回调函数|Function(templateOrder`<String>`)|-|
|submitButtonProps|提交按钮的属性|Object|-|
|draftButtonProps|草稿按钮的属性|Object|-|

### data 数据格式

```
[
  {
    "templateOrder": 0, // 用于标示当前所属选项卡
    "medicalNumber_0": {
      "cnName": "病历号",
      "enName": "medicalNumber",
      "fieldNo": "F00001",
      "inputType": "text",
      "valueToName": "value1=medicalNumber",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "medicalNumber": "1234556"}
    },
    "sex_0": {
      "cnName": "性别",
      "enName": "sex",
      "fieldNo": "F00003",
      "inputType": "select",
      "map": "男#女",
      "valueToName": "value1=sex",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "sex": "男"}
    },
  },
  {
    "templateOrder": 1,
    "pro_0": {
      "cnName": "尿蛋白质(PRO)",
      "enName": "ul-PRO",
      "fieldNo": "F00501",
      "inputType": "number",
      "unit": "mg/dl",
      "valueToName": "value1=pro_result,value2=pro_judge,value3=pro_remark",
      "valueType": "object",
      "required": true,
      "values": {"order": 0, "pro_result": "12"}
    }
  }
]
```

## MedicalEditor

用于获取病历表单组件的模板数据

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|onFinish|点击保存后的回调函数|Function(data)|-|
|confirmLoading|保存按钮的 loading 属性|Boolean|false|
|defaultData|默认选中的数据项，不支持异步更新，对象中必须包含 `id、templateName、template`|Array|-|

## Question

问卷表单组件，可以将 json 模板数据渲染成问卷表单

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|readOnly|只读，等于true时，会渲染成详情页模式|Boolean|false|
|questionBankName|题库名称，必传|String|-|
|questions|渲染所需的题目，必传|Array|-|
|[data](#data)|回显所需的数据|Array|-|
|onFinish|点击保存后的回调函数|Function(values)|-|
|backurl|返回按钮的地址，值为 false 时不显示按钮|String|-|
|footerHidden|隐藏操作按钮|Boolean|false|
|productFetch|产品请求地址|String|`/product/getPageList.json`|
|productParam|产品请求的默认参数|Object|-|
|submitButtonProps|提交按钮的属性|Object|-|

### data

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|productAnalysis|评价维度，可扩展，非组件强制|String|-|
|questionName|题目名称|String|-|
|questionNo|题目编号|String|-|
|[questionType](#questiontype)|题目类型|Enum|-|
|type|是否加入标准库<br /> `standard=标准,customize=自定义`|String|-|
|[optionList](#optionList)|题目选项|Array|-|

### optionList

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|optionName|选项名称|String|-|
|optionNo|选项编号|String|-|
|[optionType](#optionType)|选项类型|String|-|
|questionNo|题目编号|String|-|
|skipQuestionNo|下一题目的编号|String|-|
|remark|特殊字段，json字符串|JsonStringify|-|

#### questionType

|枚举值|含义|
|:--|:--|
|score|分数型|
|radio|单选型|
|checkbox|多选型|
|form|表单型|

#### optionType

|枚举值|含义|
|:--|:--|
|input|文本输入|
|number|数字输入|
|price|金额输入|
|region|地区选择|
|dept|科室选择|
|job|职能选择|
|product|产品选择|
|rangeDate|时间段选择|
|image|图片上传|
|compete|竞品填写|
