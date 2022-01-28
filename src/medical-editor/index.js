import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Space, Popconfirm } from 'antd';
import { TablePage, tools, ModalBox, FormItem, SelectMap, DateEasily, LinkBtn } from 'td-antd';
import './index.less';

import Left from './Left';

export const TemplateContext = React.createContext({});

const Template = (props) => {
  const {
    elementList = [],
  } = props;

  return (
    <TemplateContext.Provider
      value={{
        elementList,
      }}
    >
      <div className="td-template-container">
        <Left />
        <div className="center">123</div>
        <div className="right">123</div>
      </div>
    </TemplateContext.Provider>
  );
};

export default Template;
