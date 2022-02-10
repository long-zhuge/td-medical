import React, { useContext } from 'react';
import { Tabs } from 'antd';
import './index.less';

import { EditorContext } from '../index';
import Item from './Item';

const Left = () => {
  const { elementList, setElementList, dataSource } = useContext(EditorContext);

  return (
    <div className="td-medical-editor-left">
      <Tabs
        centered
        style={{ margin: 0 }}
        onChange={(activeKey) => setElementList(dataSource[activeKey])}
      >
        <Tabs.TabPane tab="基础组件" key="baseJson" />
        <Tabs.TabPane tab="特殊组件" key="speciallyJson" />
      </Tabs>
      {elementList.map(item => <Item key={item.enName} data={item} />)}
    </div>
  );
};

export default Left;
