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
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { Form, Button, Tabs, Tooltip } from 'antd';
import isNonEmptyObject from 'td-antd/es/tools/isNonEmptyObject';
import Back from '../_components/Back';
import { outPutFormValues, isMobile, clone } from '../_util';
import './index.less';

import Container from './container';

// 病历组件
import Detail from './detail';

// 组件顶层对象
export const EleContext = React.createContext({});

const OK_SUBMIT = 'submit';
const OK_DRAFT = 'draft';

const MedicalElement = (props) => {
  const {
    data = [],                // 回显数据
    readOnly = false,         //
    template = [],            // 用于渲染模板
    onFinish = () => {},      // 点击按钮的回调函数
    dept = [],                // 医院科室数据
    region = [],              // 地区数据
    backurl,                  // 返回按钮
    footerHidden = false,     // 隐藏按钮
    onTabsChange = () => {},  // 选项卡切换的回调函数
    submitButtonProps = {},   // 提交按钮的 API 属性
    draftButtonProps = {},    // 草稿按钮的 API 属性
  } = props;

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({}); // 用于回显当前选项卡表单的数据
  const [activeTabKey, setActiveTabKey] = useState('0');

  useEffect(() => {
    if (data[0]) {
      form.resetFields();
      const d = data.find(({ templateOrder }) => +templateOrder === +activeTabKey);

      if (isNonEmptyObject(d)) {
        setFormData(clone(d));
      } else {
        setFormData({});
      }
    }
  }, [activeTabKey, data]);

  // 校验按钮，返回统一的数据
  const validateValues = (type = '') => {
    const fieldList = template.find((i, index) => index === +activeTabKey).template.reduce((p, c) => {
      return [...p, ...c.fieldList];
    }, []);

    return new Promise((resolve) => {
      if (type === OK_SUBMIT) {
        form.validateFields().then((values) => {
          if (isNonEmptyObject(values)) {
            resolve(outPutFormValues(values, fieldList));
          }
        });
      } else if (type === OK_DRAFT) {
        const values = form.getFieldsValue(true);

        if (isNonEmptyObject(values)) {
          resolve(outPutFormValues(values, fieldList));
        }
      }
    })
  };

  // 提交数据
  const onOk = (type = '') => {
    validateValues(type).then(res => {
      onFinish(type, res, activeTabKey);
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
        region,
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
            <Tabs.TabPane
              tab={(
                <React.Fragment>
                  {temp.templateName}
                  <Tooltip title={temp.templateDesc}>
                    <ExclamationCircleOutlined style={{ marginLeft: 4 }} hidden={!temp.templateDesc} />
                  </Tooltip>
                </React.Fragment>
              )}
              key={templateOrder}
            >
              {temp.template.map((item, index) => (
                <Container enName={item.enName}>
                  {(Component) => (
                    <React.Fragment key={`${item.enName}_${index}`}>
                      <Component {...item} index={index} />
                      <br /><br />
                    </React.Fragment>
                  )}
                </Container>
              ))}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Form>
      <div className="submit_div" hidden={!template[0] || footerHidden}>
        <Back url={backurl} />
        <Button type="primary" {...{ children: '保存草稿', ...draftButtonProps }} onClick={onOk.bind(this, OK_DRAFT)} />
        <Button type="primary" {...{ children: '提交', ...submitButtonProps }} onClick={onOk.bind(this, OK_SUBMIT)} />
      </div>
    </EleContext.Provider>
  );
};

export default MedicalElement;
