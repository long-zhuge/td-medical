import React, { useState } from 'react';
import baseJson from './base.json';
import speciallyJson from './specially.json';
import './index.less';

import Left from './Left';
import Middle from './Middle';

export const EditorContext = React.createContext({});

const Editor = () => {
  // 总数据
  const [dataSource] = useState({
    baseJson,
    speciallyJson,
  });
  // 当前左侧组件栏中渲染的数据
  const [elementList, setElementList] = useState(baseJson);
  // 当前选中的一级组件数据
  const [selectedElementList, setSelectedElementList] = useState([]);

  return (
    <EditorContext.Provider
      value={{
        dataSource,
        elementList,
        setElementList,
        selectedElementList,
        setSelectedElementList,
      }}
    >
      <div className="td-medical-editor-container">
        <Left />
        <Middle />
        <div className="right">123</div>
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;
