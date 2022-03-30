/*
* 问卷表单组件
* API: {
*   readOnly<Boolean>: 是否只读
*   questionBankName<String>: 题库名称
*   questions<Array>: 问卷题目数据
*   data<Array>: 问卷详情数据
*   onFinish<Function>: 保存按钮的回调函数
*   backurl<Url>: 返回按钮的地址
*   footerHidden<Boolean>: 是否隐藏按钮
* }
* */

import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { Divider, Empty, Form, Tabs, Button, message } from 'antd';
import Back from '../_components/Back';

// 问卷表单组件
import QuestionScore from './_components/QuestionScore';
import QuestionRadio from './_components/QuestionRadio';
import QuestionCheckbox from './_components/QuestionCheckbox';
import QuestionForm from './_components/QuestionForm';

// 组件样式
import './index.less';

const { TabPane } = Tabs;

const QUESTION_TYPE = {
  score: QuestionScore,
  radio: QuestionRadio,
  checkbox: QuestionCheckbox,
  form: QuestionForm,
}

const baseCls = 'td-medical-question';

export const Context = React.createContext({});

export default function Question(props) {
  const {
    readOnly = false,
    preview = false,
    questionBankName,
    questions = [],
    productParam, // 获取产品选项
    region, // 省市区数据
    dept, // 医院科室数据
    data,
    onFinish,
    backurl,
    footerHidden = false, // 隐藏按钮
  } = props;

  const [form] = Form.useForm();
  // eslint-disable-next-line
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [questionError, setQuestionError] = useState();
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const renderTabBar = useCallback(() => null, []);

  // 获取到回显数据后，进行表单赋值
  useEffect(() => {
    if (questions.length) {
      const initialData = data ? questions.reduce((formValue, q) => {
        const answer = data.filter(d => d.questionNo === q.questionNo);
        if (answer.length) {
          return {
            ...formValue,
            [q.questionNo]: answer.reduce((questionValue, a) => (
              { ...questionValue, [a.optionNo]: a.otherText ? JSON.parse(a.otherText) : '' }
            ), {}),
          }
        }
        return formValue;
      }, {}) : {};
      const initialQuestions = Object.keys(initialData).length
        ? questions.filter(q => q.questionNo in initialData)
        : questions.slice(0, 1);
      setInitialValues(initialData);
      setCurrentQuestions(preview ? questions : initialQuestions);
      form.setFieldsValue(initialData);
    }
  }, [data, questions]);

  // 控制提交按钮禁用
  const canSubmit = () => {
    const currentlastQuestion = currentQuestions[currentQuestions.length - 1];
    const currentlastQuestionValue = form.getFieldsValue(true)[currentlastQuestion?.questionNo] || {};
    return currentQuestions.length
      && !currentlastQuestion.optionList[0].skipQuestionNo // 没有更多题目
      && Object.keys(currentlastQuestionValue).length; // 已经完成最后一题
  }

  // 上一题
  const goPreview = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  }

  // 下一题
  const goNext = () => {
    if (questionError) {
      message.warning(questionError);
      return;
    }
    setCurrentQuestionIndex(prev => prev + 1);
  }

  const handleFillQuestion = (questionValue, skipQuestionNo, error) => {
    setQuestionError(error);
    const nextQuestionNo = skipQuestionNo;
    if (nextQuestionNo) {
      const nextQuestion = questions.find(q => q.questionNo === nextQuestionNo);
      if (currentQuestionIndex === currentQuestions.length - 1) {
        setCurrentQuestions((prev) => prev.concat(nextQuestion));
      } else if (currentQuestions[currentQuestionIndex + 1].questionNo !== nextQuestionNo) {
        setCurrentQuestions((prev) => {
          const preservedQuestions = prev.slice(0, currentQuestionIndex + 1);
          const droppedQuestions = prev.slice(currentQuestionIndex + 1);
          const formValue = form.getFieldsValue();
          const preservedValues = preservedQuestions.reduce((value, q, index) => (
            { ...value, [q.questionNo]: index === currentQuestionIndex ? questionValue : formValue[q.questionNo] }
          ), {});
          const droppedValues = droppedQuestions.reduce((value, q) => (
            { ...value, [q.questionNo]: undefined }
          ), {});
          form.setFieldsValue({ ...preservedValues, ...droppedValues });
          return preservedQuestions.concat(nextQuestion);
        });
      }
    } else {
      forceUpdate(); // 强制更新操作按钮状态
    }
  }

  const onSubmit = async () => {
    // 校验答题
    const formValue = form.getFieldsValue(true);
    let error = null;
    currentQuestions.every((q, index) => {
      const questionValue = formValue[q.questionNo];
      if (!Object.keys(questionValue).length) {
        error = currentQuestionIndex === index ? '请先完成本题' : `请先完成第${index + 1}题`;
        return false;
      }
      if (questionError) {
        error = questionError;
        return false;
      }
      return true;
    });
    if (error) {
      message.warning(error);
      return;
    }
    const submitValue = currentQuestions.reduce((values, q) => {
      const questionValue = formValue[q.questionNo];
      const answers = Object.keys(questionValue).map(optionNo => ({
        questionNo: q.questionNo,
        optionNo,
        otherText: questionValue[optionNo] ? JSON.stringify(questionValue[optionNo]) : null,
      }));
      return values.concat(answers);
    }, []);
    if (typeof onFinish === 'function') {
      setLoading(true);
      try {
        await onFinish(submitValue);
      } catch(e) {
        message.error(e.message);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <Divider>{questionBankName}</Divider>
      {readOnly && !preview && !data?.length ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="问卷未完成"
        />
      ) : (
        <Context.Provider
          value={{
            productParam,
            region,
            dept,
          }}
        >
          <Form form={form} layout="vertical">
            {React.createElement(
              readOnly ? React.Fragment : Tabs,
              readOnly ? null : {
                className: `${baseCls}-tabs`,
                activeKey: String(currentQuestionIndex),
                animated: true,
                renderTabBar,
              },
              currentQuestions.map((q, index) => {
                const Component = QUESTION_TYPE[q.questionType];
                return React.createElement(
                  readOnly ? React.Fragment : TabPane,
                  readOnly ? null : {
                    key: index,
                  },
                  <Form.Item
                    key={q.questionNo}
                    label={`${index + 1}. ${q.questionName}`}
                    name={q.questionNo}
                  >
                    <Component readOnly={readOnly} options={q.optionList} initialValue={initialValues[q.questionNo]} onChange={handleFillQuestion} />
                  </Form.Item>
                );
              })
            )}
          </Form>
        </Context.Provider>
      )}
      {footerHidden ? null : (
        <div className={`${baseCls}-navigation`}>
          <Back url={backurl} />
          {readOnly ? null : (
            <>
              <Button
                disabled={currentQuestionIndex === 0}
                onClick={goPreview}
              >
                上一题
              </Button>
              <Button
                type="primary"
                ghost
                disabled={currentQuestionIndex === (currentQuestions.length || 1) - 1}
                onClick={goNext}
              >
                下一题
              </Button>
              <Button type="primary" onClick={onSubmit} loading={loading} disabled={!canSubmit()}>
                完成
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
