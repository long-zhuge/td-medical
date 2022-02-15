import React, { useState } from 'react';
import baseJson from './base.json';
import specialJson from './special.json';
import './index.less';

import Left from './Left';
import Middle from './Middle';
import Right from './Right';

export const EditorContext = React.createContext({});

const Editor = (props) => {
  const {
    defaultData = [],
    confirmLoading,
    onFinish = () => {},
  } = props;

  // 总数据
  const [dataSource] = useState({
    baseJson,
    specialJson,
  });
  // 当前左侧组件栏中渲染的数据
  const [elementList, setElementList] = useState(baseJson);
  // 当前选中的一级组件数据
  const [selectedElementList, setSelectedElementList] = useState(defaultData);
  // 需要编辑的字段
  const [formData, setFormData] = useState({});

  return (
    <EditorContext.Provider
      value={{
        dataSource,
        elementList,
        setElementList,
        selectedElementList,
        setSelectedElementList,
        formData,
        setFormData,
        onFinish,
        confirmLoading,
      }}
    >
      <div className="td-medical-editor-container">
        <Left />
        <Middle />
        <Right />
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;
