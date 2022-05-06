import React, { useState } from 'react';
import {Divider, Button} from 'antd';
import { Question } from 'td-medical';
import questionsData from './mock';

const Demo = () => {
  const [data, setData] = useState();

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => setData([])}>重置数据</Button>
      <Divider orientation="left">编辑</Divider>
      <Question
        backurl={false}
        data={data}
        questionBankName="问卷调查"
        questions={questionsData}
        onFinish={(values) => {
          setData(values);
        }}
      />
      <Divider orientation="left">详情</Divider>
      <Question
        readOnly
        data={data}
        backurl={false}
        questionBankName="问卷调查"
        questions={questionsData}
      />
    </React.Fragment>
  );
};

export default Demo;
