import React, { useState, useEffect, useContext } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import { Form, Button, Space, Popconfirm } from 'antd';
import { TablePage, tools, ModalBox, FormItem, SelectMap, DateEasily, LinkBtn } from 'td-antd';
import './index.less';

const Left = ({ dataSource = {} }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <React.Fragment>
      <div className="left-item-header" key={dataSource.modeEn}>
        <div className="left-item-text">{dataSource.modeCn}</div>
        <div className="left-item-action">{collapsed ? <UpOutlined onClick={onCollapsed} /> : <DownOutlined onClick={onCollapsed} />}</div>
      </div>
      {collapsed && (
        <div className="left-item-content">
          {(dataSource.fieldList || []).map(item => (
            <div className="left-item-tag" key={item.en}>
              {item.cn}
              <div className="left-item-tag-mask">+</div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Left;
