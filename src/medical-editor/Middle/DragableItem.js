// TodoList: 组件新增字段

import React, { useContext, useRef } from 'react';
import FormOutlined from '@ant-design/icons/FormOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
// import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { Space, Popconfirm } from 'antd';
import { LinkBtn } from 'td-antd';
import Field from './Field';
import './index.less';

import { EditorContext } from '../index';

const type = 'DragableMedicalItem';

const DragableItem = ({ data, index }) => {
  const { selectedElementList, setSelectedElementList, setFormData } = useContext(EditorContext);
  const ref = useRef();

  // 设置字段进行编辑
  const onForm = () => {
    data.index = index;
    setFormData(data);
  };

  // 删除组件
  const onDelete = () => {
    setFormData({});
    setSelectedElementList(selectedElementList.reduce((p, c, cIndex) => index === cIndex ? p : [...p, c], []));
  };

  const [, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
      };
    },
    drop: item => {
      setFormData({}); // 拖拽时，取消右侧编辑组件，否则会导致编辑错乱的问题
      const dragRow = selectedElementList[item.index];
      setSelectedElementList(update(selectedElementList, {
        $splice: [
          [item.index, 1],
          [index, 0, dragRow],
        ],
      }));
    },
  });

  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));

  return (
    <div className="td-medical-editor-middle-item">
      <div ref={ref} className="middle-item-header">
        <Space>
          {data.cnName}
          <LinkBtn onClick={onForm}><FormOutlined /></LinkBtn>
          {/* <LinkBtn onClick={onCreate}><PlusSquareOutlined /></LinkBtn> */}
          <Popconfirm
            title="确实删除该组件？"
            onConfirm={onDelete}
          >
            <LinkBtn danger><DeleteOutlined /></LinkBtn>
          </Popconfirm>
        </Space>
      </div>
      <div className="middle-item-content">
        {data.fieldList.map((item, index2) => (
          <Field
            data={item}
            index={index}
            index2={index2}
            method={data.method}
            key={`${item.fieldNo}_${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DragableItem;