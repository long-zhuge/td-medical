import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Button, Space, Popconfirm } from 'antd';
import { TablePage, tools, ModalBox, FormItem, SelectMap, DateEasily, LinkBtn } from 'td-antd';
import './index.less';

import { EditorContext } from '../index';
import Item from './Item';

const Left = () => {
  const { elementList, setElementList, dataSource } = useContext(EditorContext);

  return (
    <div className="td-template-left">
      <Tabs
        centered
        style={{ margin: 0 }}
        onChange={(activeKey) => setElementList(dataSource[activeKey])}
      >
        <Tabs.TabPane tab="基础组件" key="baseJson" />
        <Tabs.TabPane tab="特殊组件" key="speciallyJson" />
      </Tabs>
      {elementList.map(item => <Item key={item.modeEn} dataSource={item} />)}
    </div>
  );
};

export default Left;
