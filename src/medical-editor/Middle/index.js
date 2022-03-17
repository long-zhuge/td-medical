import React, { useContext, useRef, useState } from 'react';
import { Button, Space, Form, Row, Col, Tabs } from 'antd';
import FormItem from 'td-antd/es/form-item';
import DndProviderBox from '../../_components/DndProviderBox';
import ModalBox from 'td-antd/es/modal-box';
import Medical from '../../medical';
import DragableItem from './DragableItem';
import { genId, confirm } from '../../_util';
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

  // 选项卡切换
  const onTabsChange = (activeKey) => {
    setActiveTabKey(activeKey);
  };

  // Tabs 选项卡的操作
  const onTabsEdit = (targetKey, action) => {
    // 新增 tab
    if (action === 'add') {
      const id = genId();
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

  // 清洗数据
  const filterData = () => {
    return selectedElementList.reduce((p, c) => {
      const fieldList = c.fieldList.reduce((p2, c2) => {
        if (c2.disabled === undefined || !c2.disabled) {
          return [...p2, c2];
        }

        return p2;
      }, []);

      if (fieldList[0]) {
        return [...p, {...c, fieldList}];
      }

      return p;
    }, []);
  };

  // 提交数据
  const onSubmit = () => {
    onFinish(filterData());
  };

  // 预览
  const onPreview = () => {
    ref.current.visible(true);
    setTemplateJson(filterData());
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
                    <Col span={12}><FormItem label="模板名称" name="templateName" /></Col>
                    <Col span={12}><FormItem label="说明" name="templateDesc" required={false} /></Col>
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
