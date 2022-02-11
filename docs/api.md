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
|data|回显所需的数据|Object|-|
|onFinish|点击保存后的回调函数|Function(values)|-|
|dept|科室数据|Array|-|
|backurl|返回按钮的地址|String|-|
|footerHidden|隐藏操作按钮|Boolean|false|

## MedicalEditor

用于获取病历表单组件的模板数据

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|onFinish|点击保存后的回调函数|Function(data)|-|

## Question

问卷表单组件，可以将 json 模板数据渲染成问卷表单

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|readOnly|只读，等于true时，会渲染成详情页模式|Boolean|false|
|questionBankName|题库名称，必传|String|-|
|questions|渲染所需的题目，必传|Array|-|
|data|回显所需的数据|Array|-|
|onFinish|点击保存后的回调函数|Function(values)|-|
|backurl|返回按钮的地址|String|-|
|footerHidden|隐藏操作按钮|Boolean|false|
