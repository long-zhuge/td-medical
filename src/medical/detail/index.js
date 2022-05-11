/*
* 病历详情主组件
* */

import React, { useState, useEffect } from 'react';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Tabs, Tooltip } from 'antd';
import arrayToObject from 'td-antd/es/tools/arrayToObject';
import isNonEmptyObject from 'td-antd/es/tools/isNonEmptyObject';

import Back from '../../_components/Back';
import FormBox from './FormBox';
import { clone } from '../../_util';

import Container from '../container';

// 组件顶层对象
export const EleDetailContext = React.createContext({});

const MedicalDetail = (props) => {
  const {
    data = [],
    template = [], // 用于渲染模板
    backurl,
    dept = [], // 科室
    region = [], // 地区数据
    footerHidden = false, // 隐藏按钮
    onTabsChange = () => {},
  } = props;

  const [activeTabKey, setActiveTabKey] = useState('0');
  const [formData, setFormData] = useState({});       // 用于回显当前选项卡表单的数据
  const [regionFlat, setRegionFlat] = useState({});   // 地区一维数据
  const [deptFlat, setDeptFlat] = useState({});       // 地区一维数据

  useEffect(() => {
    if(region[0] && !isNonEmptyObject(regionFlat)) {
      setRegionFlat(arrayToObject(region));
    }

    if(dept[0] && !isNonEmptyObject(deptFlat)) {
      setDeptFlat(arrayToObject(dept, { value: 'key', label: 'title' }));
    }
  }, [region, dept]);

  useEffect(() => {
    if (data[0]) {
      const d = data.find(({ templateOrder }) => +templateOrder === +activeTabKey);

      if (isNonEmptyObject(d)) {
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
        deptFlat,
        regionFlat,
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
          <Tabs.TabPane
            key={templateOrder}
            tab={(
              <React.Fragment>
                {temp.templateName}
                <Tooltip title={temp.templateDesc}>
                  <ExclamationCircleOutlined style={{ marginLeft: 4 }} hidden={!temp.templateDesc} />
                </Tooltip>
              </React.Fragment>
            )}
          >
            {temp.template.map((item, index) => (
              <Container mothod="readonly" enName={item.enName} key={`${item.enName}_${index}`}>
                {(Component) => (
                  <FormBox index={index} fieldList={item.fieldList} formData={formData} {...item}>
                    {(res) => (
                      <Component
                        {...item}
                        {...res}
                        index={index}
                      />
                    )}
                  </FormBox>
                )}
              </Container>
            ))}
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
