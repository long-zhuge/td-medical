import React, { useState, useEffect } from 'react';
import elementListJson from './elementList.json'; // 原始组件数据，包含：基础组件、特殊组件
// import { testElement } from '../_util';
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

  // useEffect(() => {
  //   testElement(elementListJson);
  // }, []);

  // 总数据
  const [dataSource, setDataSource] = useState({});
  // 当前左侧组件栏中渲染的数据
  const [elementList, setElementList] = useState([]);
  // 当前所有 tabs 中的组件数据：[{ id, templateName, templateDesc, template }]
  const [selectedElementList, setSelectedElementList] = useState(defaultData);
  // 当前 Middle 组件选中的选项卡
  const [activeTabKey, setActiveTabKey] = useState(defaultData[0]?.id);

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

  // 检测到 selectedElementList 为空数组时，清空选项卡标示
  useEffect(() => {
    if (!selectedElementList[0]) {
      setActiveTabKey('');
    }
  }, [selectedElementList]);

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
        activeTabKey,
        setActiveTabKey,
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
