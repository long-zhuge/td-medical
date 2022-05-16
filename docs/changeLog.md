---
sidemenu: false
toc: false
nav:
  title: 更新日志
---

## 更新日志

### 🚀 1.0.8

`2022-05-16`

- Medical
  - 删除字段：既往是否妊娠、妊娠(是)、妊娠(否)、是否有意愿术后妊娠
  - 新增特殊组件：生育史

### 🚀 1.0.7

`2022-05-13`

- Question
  - 新增属性 submitButtonProps
- Medical
  - 新增组件：儿童手足口病等级、痤疮等级评估、血清检查
  - 优化对 remarks 字段的使用，现在会在组件中进行显示了
  - 移除输入类型为 radio_desc 的组件
  - 优化 select 组件，使其可以多选，可以联动输入框
  - 输入类型为 radio 的枚举值分隔符从 \n 改为 #
  - 将 "生命体征、项目要求说明" 下的字段移入到 "基本信息" 中，并移除
  - 增加 "全部(非)禁用" 功能

### 🚀 1.0.6

`2022-05-07`

- Question
  - 🐞 修复表单回显时，data 为空时，问卷空白的问题

### 🚀 1.0.5

`2022-04-28`

- Question
  - 产品组件新增 productFetch 参数

### 🚀 1.0.4

`2022-04-27`

- 代码优化，删除部分无用代码，部分 util 替换为 td-antd.tools。[commit](http://36.26.93.175:81/packages/td-medical/commit/ed5d3eda01b2e6d93e0bed5bb1c73704f6aaacdc)

### 🚀 1.0.3

`2022-04-21`

- 优化代码

### 🚀 1.0.2

`2022-04-14`

- 优化组件包中 icons 的打包
- 升级 moment@2.29.2 以修复漏洞

### 🚀 1.0.0

`2022-04-12`

- Question
  - 省市县组件优化，可以选择父节点

### 🚀 0.0.9-alpha.33

`2022-03-30`

- Medical
  - 优化默认空字段值的展示，由原先的 "--" 改为 ""
  - 统一 Table 的 size=small
  - 优化 cascader 类型组件的输出和回显
  - 🐞 修复值出现 undefined 的问题
  - 🐞 修复 readonly 模式下，切换选项卡时，如果值的集合不存在时，渲染错误的问题
  - 🐞 修复 inputType 错误导致组件崩溃的问题
- MedicalEditor
  - 优化主程序代码，将 set 函数用 dispatch 代替
  - 将 region、hospital_departments 类型的组件替换为 cascader
- Question
  - 新增表单组件 (科室、岗位职称)

### 🚀 0.0.9-alpha.31

`2022-03-25`

- Medical
  - 增加对 "地区、就诊科室" 字段的支持
- MedicalEditor
  - 优化组件的删除功能，将 Popconfirm 替换为 window.confirm
  - 删除部分无用代码
  - 增加字段：地区
  - 优化了 _components 下的组件引用
  - 增加批量设置必填项功能

### 🚀 0.0.9-alpha.29

`2022-03-23`

- MedicalEditor
  - elementList.json
    - 重新编码字段的 enName、fieldNo，使其更具有组件归属性和拓展性；增加 analysis 字段，使其字段可以被后端进行分析
    - 删除无用字段
  - 🐞 修复右侧表单在切换时回显错误的问题

### 🚀 0.0.9-alpha.24

`2022-03-22`

- Medical
  - 优化记录说明的展示
- MedicalEditor
  - 字段"民族"改为 select 类型
  - 优化"模板名称、模板说明"的字段输入，现在会自动保存了

### 🚀 0.0.9-alpha.23

`2022-03-18`

- Medical
  - 新增属性：submitButtonProps、draftButtonProps
  - 优化组件上下间隔，视觉上更好区分
  - 优化 Detail.Inspect 组件的 title，在无时间时，不展示冒号
  - 优化基础字段类型 radio_desc，使其输入框联动第一个枚举值
  - 优化 values 为空时不执行 onFinish
  - 优化详情组件，增加 FormBox 中间插件来统一处理数据
  - 优化部分组件 required 写死的问题
  - 优化了 textarea 类型的字段在详情中展示错误的问题
  - 优化了 formData 为空对象时，重复渲染的问题
- MedicalEditor
  - 优化 Middle 中组件的 title 样式，视觉上更好区分组件
  - 优化 Middle 中字段的必填样式的展示，现在能更好的查看哪些字段是必填的

### 🚀 0.0.9-alpha.19

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
