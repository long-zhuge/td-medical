import React, { useState } from 'react';
import baseJson from './base.json';
import speciallyJson from './specially.json';
import './index.less';

import Left from './Left';

export const EditorContext = React.createContext({});

const Editor = () => {
  // 总数据
  const [dataSource] = useState({
    baseJson,
    speciallyJson,
  });
  // 当前左侧组件栏中渲染的数据
  const [elementList, setElementList] = useState(baseJson);

  return (
    <EditorContext.Provider
      value={{
        dataSource,
        elementList,
        setElementList,
      }}
    >
      <div className="td-template-container">
        <Left />
        <div className="center">123</div>
        <div className="right">123</div>
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;
