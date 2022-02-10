/*
* Form 组件中子组件的套壳盒子。该组件会处理数据回显和保存的功能
* */

import React, { useContext, useEffect } from 'react';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import { Divider } from 'antd';
import { outPutFormValues, getFormValues, getFormName } from '../_util';

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
  const { form, data, onFinish } = useContext(EleContext);

  // 获取到回显数据后，进行表单赋值
  useEffect(() => {
    if (data) {
      if (customSetFieldsValue) {
        customSetFieldsValue();
      } else {
        const { values } = getFormValues(data, fieldList, index);

        form.setFieldsValue(values);
      }
    }
  }, [data]);

  const onSave = () => {
    const fields = onBeforeSave ? onBeforeSave() : fieldList.reduce((p, c) => {
      const fieldsArray = getFormName(c.valueToName, index);

      return [...p, ...fieldsArray];
    }, []);

    form.validateFields(fields).then(values => {
      if (JSON.stringify(values) === '{}') {
        return;
      }

      onFinish(outPutFormValues(values, fieldList, mainParams));
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <React.Fragment>
      <Divider>{cnName}<SaveOutlined style={{ marginLeft: 6, color: '#5468ff' }} onClick={onSave} /></Divider>
      {props.children}
    </React.Fragment>
  );
};

export default FormBox;
