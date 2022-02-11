import React, { useContext, useEffect } from 'react';
import { Form, Button, Input, Checkbox } from 'antd';
import FormItem from 'td-antd/es/form-item';
import toast from 'td-antd/es/toast';
import { clone } from '../../_util';
import './index.less';

import { EditorContext } from '../index';

const Right = () => {
  const { formData, selectedElementList, setSelectedElementList } = useContext(EditorContext);

  const [form] = Form.useForm();

  useEffect(() => {
    if (formData.cnName) {
      form.setFieldsValue(formData);
    }
  }, [formData]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      if (formData.elementNo) {
        selectedElementList[formData.index] = {...selectedElementList[formData.index], ...values};
      } else {
        selectedElementList[formData.index].fieldList[formData.index2] = {
          ...selectedElementList[formData.index].fieldList[formData.index2],
          ...values,
        };
      }
      setSelectedElementList(clone(selectedElementList));
      toast({ text: '组件数据保存成功' });
    }).catch((err) => {
      console.log(err);
    })
  };

  if (formData.cnName) {
    return (
      <div className="td-medical-editor-right">
        <Form form={form} layout="vertical" size="small">
          {formData.elementNo ? (
            <React.Fragment>
              <FormItem
                name="cnName"
                label="组件名"
              />
              <FormItem
                name="meddra"
                label="MedDRA"
                required={false}
                inputProps={{ placeholder: '请填写医学标准术语' }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FormItem name="fieldNo" hidden />
              <FormItem name="inputType" hidden />
              <FormItem
                name="cnName"
                label="字段名"
              />
              <FormItem
                name="enName"
                label="字段英文名"
              />
              <FormItem
                name="required"
                label="是否必填"
                valuePropName="checked"
              >
                <Checkbox>必填</Checkbox>
              </FormItem>
              <FormItem
                name="placeholder"
                label="输入框提示语"
                required={false}
              />
              <FormItem noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  if (['select'].includes(getFieldValue('inputType'))) {
                    return (
                      <FormItem
                        name="map"
                        label="枚举值"
                        inputProps={{ placeholder: '请用#分割；如：男#女' }}
                      />
                    );
                  } else if (['number', 'number_double'].includes(getFieldValue('inputType'))) {
                    return (
                      <FormItem
                        name="unit"
                        label="单位"
                        required={false}
                        inputProps={{ placeholder: '如：mmHg' }}
                      />
                    );
                  }
                }}
              </FormItem>
              <FormItem
                name="meddra"
                label="MedDRA"
                required={false}
                inputProps={{ placeholder: '请填写医学标准术语' }}
              />
            </React.Fragment>
          )}
          <FormItem
            name="remarks"
            label="备注"
            required={false}
          >
            <Input.TextArea />
          </FormItem>
        </Form>
        <Button type="primary" ghost onClick={onSubmit}>保存组件数据</Button>
      </div>
    );
  }

  return null;
};

export default Right;
