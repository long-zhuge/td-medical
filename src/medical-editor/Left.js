import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Space, Popconfirm } from 'antd';
import { TablePage, tools, ModalBox, FormItem, SelectMap, DateEasily, LinkBtn } from 'td-antd';

import { TemplateContext } from './index';

const Left = () => {
  const { elementList } = useContext(TemplateContext);

  return (
    <div className="td-template-left">
      <div className="left-header">组件库</div>
      {elementList.map(item => (
        <div className="left-item" key={item.modeEn}>
          <div className="left-item-text">{item.modeCn}</div>
          <div className="left-item-action">+</div>
        </div>
      ))}
    </div>
  );
};

export default Left;
