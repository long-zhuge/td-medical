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

import React, { useState, useEffect } from 'react';
import { Form, Button, Tabs } from 'antd';
import Back from '../_components/Back';
import { outPutFormValues, isMobile, filterEleMapToComponent, isEmptyObject, clone } from '../_util';

// 病历组件
import Detail from './detail';
import BaseList from './BaseList';
import Inspect from './Inspect';
import SemenRoutineQuota from './SemenRoutineQuota';
import BaseTable from './BaseTable';
import Nrs from './score/Nrs';
import MapScore from './score/MapScore';

// 组件顶层对象
export const EleContext = React.createContext({});

const ele = {
  // 基本信息、生命体征、门诊病历主体部分：《可以自定义》
  'base|vitalSigns|outpatientContent|projectDesc': BaseList,
  // 合并用药、不良事件、不良事件终止
  'combinedMedication|SFDA|SFDADone': BaseTable,
  // 血常规、尿常规、肝肾功能检查
  'routineBloodTest|urinalysis|liverKidneyTest': Inspect,
  // 精液常规检查指标（semenRoutineQuota）、精液增加检查指标
  'semenRoutineQuotaAdd': SemenRoutineQuota,
  // NRS 评分
  'NRS': Nrs,
  // 神经痛、外周运动神经障碍、外周感觉神经障碍、生活质量评分
  'neuralgia|PMND|PSND|QLS': MapScore,
};

const MedicalElement = (props) => {
  const {
    data = [],
    readOnly = false,
    template = [], // 用于渲染模板
    onFinish = () => {},
    dept, // 医院科室数据
    backurl,
    footerHidden = false, // 隐藏按钮
    onTabsChange = () => {},
    submitButtonProps = {}, // 提交按钮的 API 属性
    draftButtonProps = {}, // 草稿按钮的 API 属性
  } = props;

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({}); // 用于回显当前选项卡表单的数据
  const [activeTabKey, setActiveTabKey] = useState('0');

  useEffect(() => {
    if (data[0]) {
      form.resetFields();
      const d = data.filter(({ templateOrder }) => +templateOrder === +activeTabKey)[0];

      if (isEmptyObject(d)) {
        setFormData(clone(d));
      } else {
        setFormData({});
      }
    }
  }, [activeTabKey, data]);

  // 提交数据
  const onSubmit = () => {
    const fieldList = template.filter((i, index) => index === +activeTabKey)[0].template.reduce((p, c) => {
      return [...p, ...c.fieldList];
    }, []);

    form.validateFields().then((values) => {
      if (isEmptyObject(values)) {
        onFinish('submit', outPutFormValues(values, fieldList), activeTabKey);
      }
    }).catch((err) => {
      console.log(err);
    })
  };

  // 保存草稿
  const onSubmitDraft = () => {
    const fieldList = template.filter((i, index) => index === +activeTabKey)[0].template.reduce((p, c) => {
      return [...p, ...c.fieldList];
    }, []);

    const values = form.getFieldsValue(true);

    if (isEmptyObject(values)) {
      onFinish('draft', outPutFormValues(values, fieldList), activeTabKey);
    }
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
        activeTabKey,
        formData,
      }}
    >
      <Form
        form={form}
        scrollToFirstError
        className="td-medical-form"
        layout={isMobile ? 'vertical' : 'horizontal'}
      >
        <Tabs
          type="card"
          destroyInactiveTabPane
          activeKey={activeTabKey}
          onChange={activeKey => {
            setActiveTabKey(activeKey);
            onTabsChange(activeKey);
          }}
        >
          {template.map((temp, templateOrder) => (
            <Tabs.TabPane tab={temp.templateName} key={templateOrder}>
              {temp.template.map((item, index) => {
                const Component = filterEleMapToComponent(ele, item.enName);

                return (
                  <React.Fragment key={`${item.enName}_${index}`}>
                    <Component {...item} index={index} />
                    <br /><br />
                  </React.Fragment>
                );
              })}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Form>
      <div className="submit_div" hidden={!template[0] || footerHidden}>
        <Back url={backurl} />
        <Button type="primary" {...draftButtonProps} onClick={onSubmitDraft}>
          保存草稿
        </Button>
        <Button type="primary" {...submitButtonProps} onClick={onSubmit}>
          提交
        </Button>
      </div>
    </EleContext.Provider>
  );
};

export default MedicalElement;
