/*
* 病历详情主组件
* */

import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';

import Back from '../../_components/Back';
import FormBox from './FormBox';
import { filterEleMapToComponent, isEmptyObject, clone } from '../../_util';

// 组件开发测试
import BaseList from './BaseList';
import BaseTable from './BaseTable';
import Inspect from './Inspect';
import SemenRoutineQuota from './SemenRoutineQuota';
import Nrs from './score/Nrs';
import MapScore from './score/MapScore';

// 组件顶层对象
export const EleDetailContext = React.createContext({});

const ele = {
  // 基本信息、生命体征、门诊主体
  'base|vitalSigns|outpatientContent|projectDesc': BaseList,
  // 合并用药
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

const MedicalDetail = (props) => {
  const {
    data = [],
    template = [], // 用于渲染模板
    backurl,
    footerHidden = false, // 隐藏按钮
    onTabsChange = () => {},
  } = props;

  const [activeTabKey, setActiveTabKey] = useState('0');
  const [formData, setFormData] = useState({}); // 用于回显当前选项卡表单的数据

  useEffect(() => {
    if (data[0]) {
      const d = data.filter(({ templateOrder }) => +templateOrder === +activeTabKey)[0];

      if (isEmptyObject(d)) {
        setFormData(clone(d));
      } else {
        setFormData({});
      }
    }
  }, [activeTabKey, data]);

  return (
    <EleDetailContext.Provider
      // 如果是子组件外部的数据，请通过 context 来进行传递
      value={{
        formData,
      }}
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
                <FormBox key={`${item.enName}_${index}`} index={index} fieldList={item.fieldList} formData={formData}>
                  {(res) => (
                    <Component
                      {...item}
                      {...res}
                      index={index}
                    />
                  )}
                </FormBox>
              );
            })}
          </Tabs.TabPane>
        ))}
      </Tabs>
      <div className="submit_div" hidden={!template[0] || footerHidden}>
        <Back url={backurl} />
      </div>
    </EleDetailContext.Provider>
  );
};

export default MedicalDetail;
