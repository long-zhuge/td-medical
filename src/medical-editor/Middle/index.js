import React, { useContext, useRef, useState } from 'react';
import { Button, Space } from 'antd';
import DndProviderBox from '../../_components/DndProviderBox';
import ModalBox from 'td-antd/es/modal-box';
import Medical from '../../medical';
import DragableItem from './DragableItem';
import './index.less';

import { EditorContext } from '../index';

const Middle = () => {
  const { selectedElementList, setSelectedElementList, setFormData, onFinish, confirmLoading } = useContext(EditorContext);

  const ref = useRef();
  const [templateJson, setTemplateJson] = useState([]);

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
    <DndProviderBox>
      <div className="td-medical-editor-middle">
        {selectedElementList.map((ele, index) => <DragableItem data={ele} index={index} key={`${ele.elementNo}_${index}`} />)}
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
          <Medical template={templateJson} onFinish={(res) => console.log(res)} />
        </ModalBox>
      </div>
    </DndProviderBox>

  );
};

export default Middle;
