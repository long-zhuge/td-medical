import React, { useState, useContext } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Space } from 'antd';
import { genId, confirm, clone } from '../../_util';
import './index.less';

import { EditorContext } from '../index';

const Item = ({ data = {} }) => {
  const {
    dispatch,
    selectedElementList,
    activeTabKey,
  } = useContext(EditorContext);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };

  /*
  * 根据 activeTabKey 标示进行添加数据
  * PS：当 activeTabKey 不存在时，标示初始化添加数据
  * */
  const onAddElement = () => {
    if (activeTabKey) {
      if (selectedElementList.filter(i => i.id === activeTabKey)[0]?.template.some(item => item.elementNo === data.elementNo)) {
        confirm(`检测到当前选项卡已经添加了“${data.cnName}”组件，是否确认添加？`).then(() => {
          setData();
        });
      } else {
        setData();
      }
    } else {
      const id = genId();
      dispatch('SELECTED_ELEMENT_LIST', [{
        id,
        template: [clone(data)],
      }]);
      dispatch('ACTIVE_TAB_KEY', id);
    }
  };

  const setData = () => {
    const d = selectedElementList.reduce((p, c) => {
      if (c.id === activeTabKey) {
        return [...p, {...c, template: [...c.template, data]}];
      }

      return [...p, c];
    }, []);

    dispatch('SELECTED_ELEMENT_LIST', clone(d));
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

export default Item;
