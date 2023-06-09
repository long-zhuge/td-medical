import React, { useContext } from 'react';
import { Tabs } from 'antd';
import './index.less';

import { EditorContext } from '../index';
import Item from './Item';

const Left = () => {
  const { elementList, dataSource, dispatch } = useContext(EditorContext);

  return (
    <div className="td-medical-editor-left">
      <Tabs
        centered
        style={{ margin: 0 }}
        onChange={(activeKey) => dispatch('ELEMENT_LIST', dataSource[activeKey])}
      >
        <Tabs.TabPane tab="基础组件" key="default" />
        <Tabs.TabPane tab="特殊组件" key="special" />
      </Tabs>
      {elementList.map(item => <Item key={item.elementNo} data={item} />)}
    </div>
  );
};

export default Left;
