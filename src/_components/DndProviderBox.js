/*
* 解决：Cannot have two HTML5 backends at the same time 报错
* @github：https://github.com/react-dnd/react-dnd/issues/186
* */

import React, { useRef } from 'react';
import { DndProvider, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DndProviderBox = (props) => {
  const manager = useRef(createDndContext(HTML5Backend));

  return (
    <DndProvider manager={manager.current.dragDropManager}>
      {props.children}
    </DndProvider>
  );
};

export default DndProviderBox;
