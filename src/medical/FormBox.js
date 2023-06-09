/*
* Form 组件中子组件的套壳盒子。该组件会处理数据回显和保存的功能
* */

import React, { useContext, useEffect } from 'react';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import { Divider } from 'antd';
import isNonEmptyObject from 'td-antd/es/tools/isNonEmptyObject';
import { outPutFormValues, getFormValues, getFormName, clone } from '../_util';

import { EleContext } from './index';

const FormBox = (props) => {
  const {
    cnName,
    enName,
    elementNo,
    index = 0,
    remarks = '',
    fieldList = [],
    customSetFieldsValue, // 自定义数据回显函数
    onBeforeSave,         // 保存前的回调函数，必须返回 fields 相关内容
  } = props;

  const mainParams = { elementNo, enName, cnName }; // 主对象属性。在提交给后端的数据中，必须携带
  const { form, onFinish, activeTabKey, formData } = useContext(EleContext);

  // 获取到回显数据后，进行表单赋值
  useEffect(() => {
    if (isNonEmptyObject(formData)) {
      const res = getFormValues(formData, fieldList, index);

      if (customSetFieldsValue) {
        customSetFieldsValue(res);
      } else {
        form.setFieldsValue(res.values);
      }
    }
  }, [formData]);

  // 组件的保存草稿
  const onSubmitDraft = () => {
    const fields = onBeforeSave ? onBeforeSave() : fieldList.reduce((p, c) => {
      const fieldsArray = getFormName(c.valueToName, index);

      return [...p, ...fieldsArray];
    }, []);

    // 使用 clone 可以将 values 中 undefined 值过滤掉
    const values = clone(form.getFieldsValue(fields));

    if (isNonEmptyObject(values)) {
      onFinish('draft', outPutFormValues(values, fieldList, mainParams), activeTabKey)
    }
  };

  return (
    <React.Fragment>
      <Divider>{cnName}<SaveOutlined style={{ marginLeft: 6, color: '#5468ff' }} onClick={onSubmitDraft} /></Divider>
      {remarks && <div className="td-medical-tip pre-wrap">{remarks}</div>}
      {props.children}
    </React.Fragment>
  );
};

export default FormBox;
