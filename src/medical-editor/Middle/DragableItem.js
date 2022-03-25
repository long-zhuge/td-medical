import React, { useContext, useRef } from 'react';
import FormOutlined from '@ant-design/icons/FormOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import InteractionOutlined from '@ant-design/icons/InteractionOutlined';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { Space } from 'antd';
import LinkBtn from 'td-antd/es/link-btn';
import { clone, confirm } from '../../_util';
import Field from './Field';
import './index.less';

import { EditorContext } from '../index';

const type = 'DragableMedicalItem';

const DragableItem = ({ data, index }) => {
  const { selectedElementList, setSelectedElementList, setFormData, activeTabKey, rightForm } = useContext(EditorContext);
  const ref = useRef();
  const requiredRef = useRef(true);

  // 设置字段进行编辑
  const onForm = () => {
    rightForm.resetFields();
    data.index = index;
    setFormData(data);
  };

  // 设置组件的必填项
  const setUpRequiredAll = () => {
    confirm(`是否将组件中的字段都改为${requiredRef.current ? '非': ''}必填？`).then(() => {
      data.fieldList.forEach(item => {
        item.required = !requiredRef.current;
      });
      requiredRef.current = !requiredRef.current;
      setSelectedElementList(clone(selectedElementList));
    })
  };

  // 删除组件
  const onDelete = () => {
    confirm(`确定删除组件：${data.cnName}`).then(() => {
      setFormData({});

      const d = selectedElementList.reduce((p, c) => {
        if (c.id === activeTabKey) {
          return [...p, {...c, template: c.template.filter((i, cIndex) => cIndex !== index)}];
        }

        return [...p, c];
      }, []);

      setSelectedElementList(d);
    });
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
      const templateList = selectedElementList.filter(i => i.id === activeTabKey)[0].template;
      const dragRow = templateList[item.index];

      const updateData = update(templateList, {
        $splice: [
          [item.index, 1],
          [index, 0, dragRow],
        ],
      })

      selectedElementList.forEach(i => {
        if (i.id === activeTabKey) {
          i.template = updateData;
        }
      })

      setSelectedElementList(clone(selectedElementList));
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
          <LinkBtn onClick={setUpRequiredAll}><InteractionOutlined /></LinkBtn>
          <LinkBtn danger onClick={onDelete}><DeleteOutlined /></LinkBtn>
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
