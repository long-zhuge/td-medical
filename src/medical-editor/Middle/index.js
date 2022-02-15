import React, { useContext, useRef, useState } from 'react';
import FormOutlined from '@ant-design/icons/FormOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { Button, Space, Popconfirm } from 'antd';
import LinkBtn from 'td-antd/es/link-btn';
import ModalBox from 'td-antd/es/modal-box';
import Medical from '../../medical';
import Field from './Field';
import './index.less';

import { EditorContext } from '../index';

const Middle = () => {
  const { selectedElementList, setSelectedElementList, setFormData, onFinish, confirmLoading } = useContext(EditorContext);

  const ref = useRef();
  const [templateJson, setTemplateJson] = useState([]);

  // 删除组件
  const onDelete = (index) => {
    setFormData({});
    setSelectedElementList(selectedElementList.reduce((p, c, cIndex) => index === cIndex ? p : [...p, c], []));
  };

  // 设置字段进行编辑
  const onForm = (ele, index) => {
    ele.index = index;
    setFormData(ele);
  };

  // 清洗数据
  const filterData = () => {
    return selectedElementList.reduce((p, { index, ...c }) => {
      const fieldList = c.fieldList.reduce((p2, { index, index2, ...c2 }) => {
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
    const is = confirm('是否重置病历模板数据');

    if (is) {
      setFormData({});
      setSelectedElementList([]);
    }
  };

  return (
    <div className="td-medical-editor-middle">
      {selectedElementList.map((ele, index) => (
        <div className="td-medical-editor-middle-item" key={`${ele.elementNo}_${index}`}>
          <div className="middle-item-header">
            <Space>
              {ele.cnName}
              <LinkBtn onClick={() => onForm(ele, index)}><FormOutlined /></LinkBtn>
              <Popconfirm
                title="确实删除该组件？"
                onConfirm={() => onDelete(index)}
              >
                <LinkBtn danger><DeleteOutlined /></LinkBtn>
              </Popconfirm>
            </Space>
          </div>
          <div className="middle-item-content">
            {ele.fieldList.map((item, index2) => (
              <Field
                data={item}
                index={index}
                index2={index2}
                method={ele.method}
                key={`${item.fieldNo}_${index}`}
              />
            ))}
          </div>
        </div>
      ))}
      {selectedElementList[0] && (
        <div className="middle-item-footer">
          <Space>
            <Button onClick={onReset}>重置</Button>
            <Button onClick={onPreview}>预览</Button>
            <Button loading={confirmLoading} type="primary" onClick={onSubmit}>保存</Button>
          </Space>
        </div>
      )}
      <ModalBox
        ref={ref}
        title="预览"
        width={960}
        footer={false}
      >
        <Medical template={templateJson} />
      </ModalBox>
    </div>
  );
};

export default Middle;
