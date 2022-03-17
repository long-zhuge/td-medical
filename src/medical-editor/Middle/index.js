import React, { useContext, useRef, useState, useEffect } from 'react';
import { Button, Space, Form, Row, Col, Tabs } from 'antd';
import FormItem from 'td-antd/es/form-item';
import toast from 'td-antd/es/toast';
import DndProviderBox from '../../_components/DndProviderBox';
import ModalBox from 'td-antd/es/modal-box';
import Medical from '../../medical';
import DragableItem from './DragableItem';
import { genId, confirm, clone } from '../../_util';
import './index.less';

import { EditorContext } from '../index';

const Middle = () => {
  const {
    selectedElementList, setSelectedElementList,
    setFormData, onFinish,
    confirmLoading,
    activeTabKey,
    setActiveTabKey,
  } = useContext(EditorContext);

  const ref = useRef();
  const [form] = Form.useForm();
  const [templateJson, setTemplateJson] = useState([]);

  // 当前选项卡被激活时，设置模板名称和说明
  useEffect(() => {
    if (activeTabKey) {
      form.resetFields();
      form.setFieldsValue(selectedElementList.filter(i => i.id === activeTabKey)[0]);
    }
  }, [activeTabKey]);

  // 保存模板名称、模板说明
  const onSubmitTemplateName = () => {
    form.validateFields().then(({ templateName, templateDesc }) => {
      selectedElementList.some(i => {
        if (i.id === activeTabKey) {
          i.templateName = templateName;
          i.templateDesc = templateDesc;
          return true;
        }

        return false;
      });

      setSelectedElementList(clone(selectedElementList));
    })
  };

  // 选项卡切换
  const onTabsChange = (activeKey) => {
    setFormData({});
    setActiveTabKey(activeKey);
  };

  // Tabs 选项卡的操作
  const onTabsEdit = (targetKey, action) => {
    // 新增 tab
    if (action === 'add') {
      const id = genId();
      setFormData({});
      setActiveTabKey(id);
      setSelectedElementList([...selectedElementList, {
        id, template: [],
      }]);
    }

    // 删除 tab
    if (action === 'remove') {
      const setData = () => {
        // 删除当前选项卡后，自动跳转至前一个选项卡
        setFormData({});
        return selectedElementList.filter((i, index) => {
          if (targetKey === activeTabKey && i.id === targetKey) {
            /*
            * 获取前一个对象，或者后一个对象
            * PS：当删除第一个时，跳转到后面一个对象
            * */
            const obj = selectedElementList[index - 1] || selectedElementList[index + 1];

            if (obj) {
              setActiveTabKey(obj.id);
            }
          }

          return i.id !== targetKey;
        });
      };

      if (selectedElementList.some(i => i.id === targetKey && i.template[0])) {
        confirm('要删除的选项卡中已有病例数据，确定要删除？').then(() => {
          setSelectedElementList(setData());
        });
      } else {
        setSelectedElementList(setData());
      }
    }
  };

  // 清洗数据，将 disabled 的数据进行清除
  const filterElementList = () => {
    return selectedElementList.reduce((p, c) => {
      const template = c.template.reduce((p2, c2) => {
        const fieldList = c2.fieldList.reduce((p3, c3) => {
          if (c3.disabled === undefined || !c3.disabled) {
            return [...p3, c3];
          }

          return p3;
        }, []);

        if (fieldList[0]) {
          return [...p2, {...c2, fieldList}];
        }

        return p2;
      }, []);

      return [...p, {...c, template}]
    }, [])
  };

  // 校验组件完整性
  const validateElementList = () => {
    const nowElementList = filterElementList();
    let message;

    nowElementList.some(({ templateName, template }, index) => {
      if (!templateName || !template[0]) {
        message = `第${index+1}次记录不完整，请进行补充`;
        return true;
      }

      return false;
    });

    return new Promise((resolve) => {
      if (message) {
        toast({ type: 'error', text: message });
      } else {
        resolve(nowElementList);
      }
    });
  };

  /*
  * 提交数据
  *   1、检查组件中是否有空白组件。如有，则报错
  * */
  const onSubmit = () => {
    validateElementList().then((nowElementList) => {
      onFinish(nowElementList);
    })
  };

  // 预览
  const onPreview = () => {
    validateElementList().then((nowElementList) => {
      ref.current.visible(true);
      setTemplateJson(nowElementList);
    })
  };

  // 重置
  const onReset = () => {
    confirm('是否重置病历模板数据').then(() => {
      setFormData({});
      setSelectedElementList([]);
    });
  };

  if (selectedElementList[0]) {
    return (
      <DndProviderBox>
        <div className="td-medical-editor-middle">
          <Tabs
            type="editable-card"
            activeKey={activeTabKey}
            onEdit={onTabsEdit}
            onChange={onTabsChange}
          >
            {selectedElementList.map((i, index) => (
              <Tabs.TabPane tab={`第${index+1}次记录`} key={i.id}>
                <Form form={form}>
                  <Row gutter={12}>
                    <Col span={10}><FormItem label="模板名称" name="templateName" /></Col>
                    <Col span={10}><FormItem label="说明" name="templateDesc" required={false} /></Col>
                    <Col span={4}><Button type="primary" ghost onClick={onSubmitTemplateName}>保存</Button></Col>
                  </Row>
                </Form>
                {i.template.map((ele, index2) => <DragableItem data={ele} index={index2} key={`${ele.elementNo}_${index2}`} />)}
              </Tabs.TabPane>
            ))}
          </Tabs>
          <div className="middle-item-footer">
            <Space>
              <Button onClick={onReset}>重置</Button>
              <Button onClick={onPreview}>预览</Button>
              <Button loading={confirmLoading} type="primary" onClick={onSubmit}>保存</Button>
            </Space>
          </div>
          <ModalBox
            ref={ref}
            title="预览"
            width={960}
            footer={false}
          >
            <Medical
              template={templateJson}
              onFinish={(res) => {
                console.log(JSON.stringify(res))
              }}
            />
          </ModalBox>
        </div>
      </DndProviderBox>
    );
  }

  return null;
};

export default Middle;
