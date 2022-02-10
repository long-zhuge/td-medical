import React, { useState, useContext } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Space, Modal } from 'antd';
import './index.less';

import { EditorContext } from '../index';

const Left = ({ data = {} }) => {
  const { selectedElementList, setSelectedElementList } = useContext(EditorContext);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 添加病历组件
  const onAddElement = () => {
    if (selectedElementList.some(item => item.elementNo === data.elementNo)) {
      Modal.confirm({
        title: '提示',
        content: `检测到当前已经添加了“${data.cnName}”组件，是否继续添加？`,
        okText: '取消',
        cancelText: '继续添加',
        onCancel() {
          setSelectedElementList([...selectedElementList, data]);
        },
      });
    } else {
      setSelectedElementList([...selectedElementList, data]);
    }
  };

  return (
    <React.Fragment>
      <div className="left-item-header" key={data.enName}>
        <div className="left-item-text">
          {data.cnName}
        </div>
        <div className="left-item-header-mask">
          <Space>
            <PlusOutlined onClick={onAddElement} />
            {collapsed ? <UpOutlined onClick={onCollapsed} /> : <DownOutlined onClick={onCollapsed} />}
          </Space>
        </div>
      </div>
      {collapsed && (
        <div className="left-item-content">
          {(data.fieldList || []).map(item => (
            <div className="left-item-tag" key={item.fieldNo}>{item.cnName}</div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Left;
