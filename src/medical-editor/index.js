import React, { useState, useEffect } from 'react';
import elementListJson from './elementList.json';
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
  const [dataSource, setDataSource] = useState({});
  // 当前左侧组件栏中渲染的数据
  const [elementList, setElementList] = useState([]);
  // 当前选中的一级组件数据
  const [selectedElementList, setSelectedElementList] = useState(defaultData);
  // 需要编辑的字段
  const [formData, setFormData] = useState({});

  /*
  * 对原始数据进行分类，通过 method 进行归类
  * */
  useEffect(() => {
    const data = elementListJson.reduce((p, c) => {
      return {
        ...p,
        [c.method]: [...(p[c.method] || []), c],
      };
    }, {});
    setDataSource({...data, all: elementListJson});
    setElementList(data.default);
  }, []);

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
