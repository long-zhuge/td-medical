/*
* Form 组件中子组件的套壳盒子。该组件会处理数据回显和保存的功能
* */

import React, { useContext, useEffect } from 'react';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import { Divider } from 'antd';
import { outPutFormValues, getFormValues, getFormName, isEmptyObject, clone } from '../_util';

import { EleContext } from './index';

const FormBox = (props) => {
  const {
    cnName,
    enName,
    elementNo,
    index = 0,
    fieldList = [],
    customSetFieldsValue, // 自定义数据回显函数
    onBeforeSave, // 保存前的回调函数，必须返回 fields 相关内容
  } = props;

  const mainParams = { elementNo, enName, cnName }; // 主对象属性。在提交给后端的数据中，必须携带
  const { form, onFinish, activeTabKey, formData } = useContext(EleContext);

  // 获取到回显数据后，进行表单赋值
  useEffect(() => {
    if (formData) {
      if (customSetFieldsValue) {
        customSetFieldsValue();
      } else {
        const { values } = getFormValues(formData, fieldList, index);

        form.setFieldsValue(values);
      }
    }
  }, [formData]);

  // 组件的保存草稿
  const onSubmitDraft = () => {
    const fields = onBeforeSave ? onBeforeSave() : fieldList.reduce((p, c) => {
      const fieldsArray = getFormName(c.valueToName, index);

      return [...p, ...fieldsArray];
    }, []);

    const values = clone(form.getFieldsValue(fields));

    if (isEmptyObject(values)) {
      onFinish('draft', outPutFormValues(values, fieldList, mainParams), activeTabKey)
    }
  };

  return (
    <React.Fragment>
      <Divider>{cnName}<SaveOutlined style={{ marginLeft: 6, color: '#5468ff' }} onClick={onSubmitDraft} /></Divider>
      {props.children}
    </React.Fragment>
  );
};

export default FormBox;
