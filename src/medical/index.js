/*
* 病历模板组件
* API: {
*   data<Record>: 具有特定结构的病历详情数据
*   readOnly<Boolean>: 是否只读
*   template<Array>: 用于渲染病历模板表单的数据
*   onFinish<Function>: 保存按钮的回调函数
*   backurl<Url>: 返回按钮的地址
*   dept<Array>: 医院科室数据
* }
* */

// todo list: 疾病史、导联心电图检查 未开发

import React from 'react';
import { Form, Button } from 'antd';
import Back from '../_components/Back';
import { outPutFormValues, isMobile, filterEleMapToComponent } from '../_util';

// 病历组件
import Detail from './detail';
import BaseList from './BaseList';
import Inspect from './Inspect';
import SemenRoutineQuota from './SemenRoutineQuota';
import BaseTable from './BaseTable';

// 组件顶层对象
export const EleContext = React.createContext({});

const ele = {
  // 基本信息、生命体征、门诊病历主体部分：《可以自定义》
  'base|vitalSigns|outpatientContent': BaseList,
  // 合并用药：《可以自定义》
  'combinedMedication': BaseTable,
  // 血常规、尿常规、肝肾功能检查
  'routineBloodTest|urinalysis|liverKidneyTest': Inspect,
  // 精液常规检查指标（semenRoutineQuota）、精液增加检查指标
  'semenRoutineQuotaAdd': SemenRoutineQuota,
};

const MedicalElement = (props) => {
  const {
    data,
    readOnly = false,
    template = [], // 用于渲染模板
    onFinish = () => {},
    dept, // 医院科室数据
    backurl,
    footerHidden = false, // 隐藏按钮
  } = props;

  const [form] = Form.useForm();

  // 保存
  const onSubmit = () => {
    const fieldList = template.reduce((p, c) => {
      return [...p, ...c.fieldList];
    }, []);

    form.validateFields().then((values) => {
      onFinish(outPutFormValues(values, fieldList));
    }).catch((err) => {
      console.log(err);
    })
  };

  if (readOnly) {
    return <Detail {...props} />;
  }

  return (
    <EleContext.Provider
      // 如果是子组件外部的数据，请通过 context 来进行传递
      value={{
        form,
        data,
        dept,
        onFinish,
      }}
    >
      <Form form={form} layout={isMobile ? 'vertical' : 'horizontal'} className="td-medical-form" scrollToFirstError>
        {template.map((item, index) => {
          const Component = filterEleMapToComponent(ele, item.enName);

          return <Component {...item} index={index} key={item.enName} />;
        })}
      </Form>
      {footerHidden ? null : (
        <div className="submit_div" hidden={!template[0]}>
          <Back url={backurl} />
          <Button type="primary" onClick={onSubmit}>
            保存
          </Button>
        </div>
      )}
    </EleContext.Provider>
  );
};

export default MedicalElement;
