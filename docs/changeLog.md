---
sidemenu: false
toc: false
nav:
  title: 更新日志
---

## 更新日志

### 🚀 0.0.9-alpha.17

`2022-03-17`

- Medical、MedicalEditor
  - 重构，使其支持病例队列模式

### 🚀 0.0.9-alpha.16

`2022-03-10`

- Medical
  - 🐞 修复 MapScore 组件表单无法回显的问题
  - 🐞 修复 MapScore 组件在详情模式下，无法区分空字符串后渲染成 0 的问题

### 🚀 0.0.9-alpha.15

`2022-03-09`

- Question
  - 优化问卷详情只读样式
  - 重构问卷分数型组件适配手机端
  - 删除属性 backHidden，可以使用 backurl=false 代替
- Medical
  - 🐞 修复值为 undefined 时依然输出的问题

### 🚀 0.0.9-alpha.14

`2022-03-09`

- Medical
  - 🐞 修复保存空值为 undefined 的问题
  - MapScore 组件的列表 title 修改

### 🚀 0.0.9-alpha.13

`2022-03-04`

- Medical
  - 优化 Date 组件，使其可支持 YYYY-MM 的格式

### 🚀 0.0.9-alpha.12

`2022-03-03`

- Medical
  - 应业务要求，将特殊组件全部改为非必填
  - 评分组件的分值改为 map 转化，并统一设计成 MapScore 组件

### 🚀 0.0.9-alpha.10

`2022-03-02`

- MedicalEditor
  - 新增组件：外周感觉神经障碍、外周感觉神经障碍、神经痛

### 🚀 0.0.9-alpha.8

`2022-03-01`

- Question
  - 问卷模板预览
  - 提交按钮载入状态

### 🚀 0.0.9-alpha.8

`2022-02-25`

- Question
  - 🐞 修复问卷图片初始值设置
  - 🐞 修复竞品只读模式

### 🚀 0.0.9-alpha.7

`2022-02-24`

- MedicalEditor
  - NRS评分、生活质量评分，组件增加预览模式

### 🚀 0.0.9-alpha.6

`2022-02-21`

- Question
  - 重构答案存储形式，以`optionNo`为key，`otherText`为JSON格式value
  - 新增表单组件 (文本、数值、价格、区域、产品、起止时间、图片、竞品)
  - 单选型支持附加文本
  - 更新依赖配置，设置`peerDependencies`

### 🚀 0.0.9-alpha.5

`2022-02-21`

- MedicalEditor
  - 添加拖拽排序功能
  - 优化部分特殊组件，使其变更为基础组件
  - 新增内置组件：项目说明、NRS评分、生活质量评分、不良事件
  - 部分组件字段增加


### 🚀 0.0.9-alpha.4

`2022-02-15`

- Medical
  - 优化了 "合并用药" 的组件，使其可以动态增减
  - 优化基础的 Form.Item，使其支持 required 等属性
  - 优化数字输入组件，现在不会根据 rules 进行正则判定了，现在默认支持 负数-零-正数
- MedicalEditor
  - 新增组件，可以自定义设置 Medical 的模板数据
  - 内置了组件数据，无需从后端获取

### 🚀 0.0.9-alpha.2

`2022-01-28`

- 调整组件名称：原先 MedicalForm 改为 Medical；原先 QuestionForm 改为 Question；

### 🚀 0.0.9-alpha.1

`2022-01-26`

- MedicalForm
  - 优化类型为 "门诊主体" 的表单为竖行展示
  - 补充 demo 对 "门诊主体" 内容的展示

### 🚀 0.0.8

`2021-12-06`

- QuestionForm
  - 问卷未完成时展示空状态

### 🚀 0.0.7

`2021-11-25`

- QuestionForm
  - 🐞 编辑问卷时可中途提交
  - 🐞 修改上一题破坏原链路时手动清空数据

### 🚀 0.0.6

`2021-11-23`

- 更新 QuestionForm 问卷组件

### 🚀 0.0.5

`2021-11-20`

- 新增 QuestionForm 问卷组件

### 🚀 0.0.4

`2021-10-20`

- 优化表单组件，现在业务组件的编写更简单了
- 优化 template 的数据要求，现在能减少部分字段，从而减小数据库的json串大小

### 🚀 0.0.1

`2021-10-18`

- MedicalForm 组件发布
