import React, { useContext, useEffect } from 'react';
import { Form, Button, Checkbox } from 'antd';
import FormItem from 'td-antd/es/form-item';
import toast from 'td-antd/es/toast';
import { clone } from '../../_util';
import './index.less';

import { EditorContext } from '../index';

const Right = () => {
  const { formData, selectedElementList, activeTabKey, rightForm, dispatch } = useContext(EditorContext);

  useEffect(() => {
    if (formData.cnName) {
      rightForm.setFieldsValue(formData);
    }
  }, [formData]);

  const onSubmit = () => {
    rightForm.validateFields().then((values) => {
      if (formData.elementNo) {
        // 组件数据修改
        selectedElementList.forEach(i => {
          if (i.id === activeTabKey) {
            i.template[formData.index] = {...i.template[formData.index], ...values};
          }
        });
      } else {
        // 字段数据修改
        selectedElementList.forEach(i => {
          if (i.id === activeTabKey) {
            const original = i.template[formData.index].fieldList[formData.index2];
            i.template[formData.index].fieldList[formData.index2] = {
              ...original,
              ...values,
              // 表单中 enName 开放后，该属性也需要开放
              // valueToName: original.enName !== values.enName ? original.valueToName.replaceAll(original.enName, values.enName) : original.valueToName,
            };
          }
        });
      }
      dispatch('SELECTED_ELEMENT_LIST', clone(selectedElementList));
      toast({ text: '组件数据保存成功' });
    }).catch((err) => {
      console.log(err);
    })
  };

  if (formData.cnName) {
    return (
      <div className="td-medical-editor-right">
        <Form form={rightForm} layout="vertical" size="small">
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
                name="required"
                label="是否必填"
                valuePropName="checked"
              >
                <Checkbox>必填</Checkbox>
              </FormItem>
              <FormItem
                name="analysis"
                label="是否分析"
                valuePropName="checked"
                required={false}
              >
                <Checkbox>是</Checkbox>
              </FormItem>
              <FormItem
                name="placeholder"
                label="输入框提示语"
                required={false}
              />
              <FormItem.Update names={['inputType']}>
                {({ inputType }) => {
                  if (['select', 'select_multiple'].includes(inputType)) {
                    return (
                      <React.Fragment>
                        <FormItem
                          name="map"
                          label="枚举值"
                          itemType="textarea"
                          inputProps={{ placeholder: '请用#分割；如：男#女' }}
                        />
                        <FormItem
                          name="linkage"
                          label="枚举联动值"
                          itemType="textarea"
                          inputProps={{ placeholder: '请用#分割；如：男#女' }}
                        />
                      </React.Fragment>
                    );
                  }

                  if (['number', 'number_double'].includes(inputType)) {
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
              </FormItem.Update>
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
            label="提示信息"
            required={false}
            itemType="textarea"
          />
        </Form>
        <Button type="primary" ghost onClick={onSubmit}>保存组件数据</Button>
      </div>
    );
  }

  return null;
};

export default Right;
