import React, { useState, useRef } from 'react';
import ModalBox from 'td-antd/es/modal-box';
import { Question } from 'td-medical';
import questionsData from './mock';

const Demo = () => {
  const [data, setData] = useState();
  const modalRef = useRef();

  return (
    <>
      <ModalBox
        width={800}
        ref={modalRef}
        title="问卷详情"
      >
        <Question
          questionBankName="问卷调查"
          questions={questionsData}
          readOnly
          data={data}
        />
      </ModalBox>
      <Question
        questionBankName="问卷调查"
        questions={questionsData}
        onFinish={(values) => {
          setData(values);
          modalRef.current.visible(true);
        }}
      />
    </>
  );
};

export default Demo;
