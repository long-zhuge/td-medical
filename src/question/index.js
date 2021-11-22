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

import React, { useState, useReducer, useEffect, useRef } from 'react';
import { Divider, Form, Carousel, Button, message } from 'antd';
import Back from '../_components/Back';

// 问卷表单组件
import QuestionScore from './_components/QuestionScore';
import QuestionRadio from './_components/QuestionRadio';
import QuestionCheckbox from './_components/QuestionCheckbox';

// 组件样式
import './index.less';

const QUESTION_TYPE = {
  score: QuestionScore,
  radio: QuestionRadio,
  checkbox: QuestionCheckbox,
}

export default function QuestionForm(props) {
  const {
    readOnly = false,
    questionBankName,
    questions = [],
    data,
    onFinish,
    backurl,
    footerHidden = false, // 隐藏按钮
  } = props;

  const [form] = Form.useForm();
  const carouselRef = useRef(null);
  // eslint-disable-next-line
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 获取到回显数据后，进行表单赋值
  useEffect(() => {
    if (questions.length) {
      const initialValues = data ? questions.reduce((obj, q) => {
        const answer = data.filter(d => d.questionNo === q.questionNo);
        if (answer.length) {
          return {
            ...obj,
            [q.questionNo]: {
              optionNos: answer.map(a => a.optionNo),
              otherText: answer.reduce((texts, a) => ({ ...texts, [a.optionNo]: a.otherText }), {}),
            },
          }
        }
        return obj;
      }, {}) : {};
      const initialQuestions = Object.keys(initialValues).length
        ? questions.filter(q => q.questionNo in initialValues)
        : questions.slice(0, 1);
      setCurrentQuestions(initialQuestions);
      form.setFieldsValue(initialValues);
    }
  }, [data, questions]);

  // 控制提交按钮禁用
  const canSubmit = () => {
    const currentlastQuestion = currentQuestions[currentQuestions.length - 1];
    const currentlastQuestionValue = form.getFieldsValue()[currentlastQuestion?.questionNo];
    return currentQuestions.length
      && !currentlastQuestion.optionList[0].skipQuestionNo // 没有更多题目
      && currentlastQuestionValue?.optionNos?.length; // 已经完成最后一题
  }

  // 上一题
  const goPreview = () => {
    setCurrentQuestionIndex(prev => prev - 1);
    carouselRef.current.prev();
  }

  // 下一题
  const goNext = () => {
    const formValue = form.getFieldsValue();
    const currentQuestionNo = currentQuestions[currentQuestionIndex].questionNo;
    const currentQuestionValue = formValue[currentQuestionNo];
    if (currentQuestionValue.error) {
      message.warning(currentQuestionValue.error);
      return;
    }
    setCurrentQuestionIndex(prev => prev + 1);
    carouselRef.current.next();
  }

  const handleFillQuestion = (currentQuestionValue) => {
    const nextQuestionNo = currentQuestionValue.skipQuestionNo;
    if (nextQuestionNo) {
      const nextQuestion = questions.find(q => q.questionNo === nextQuestionNo);
      if (currentQuestionIndex === currentQuestions.length - 1) {
        setCurrentQuestions((prev) => prev.concat(nextQuestion));
      } else if (currentQuestions[currentQuestionIndex + 1].questionNo !== nextQuestionNo) {
        setCurrentQuestions((prev) => {
          const preservedQuestions = prev.slice(0, currentQuestionIndex + 1);
          return preservedQuestions.concat(nextQuestion);
        });
      }
    } else {
      forceUpdate();
    }
  }

  const onSubmit = () => {
    // 校验答题
    const formValue = form.getFieldsValue();
    let error = null;
    currentQuestions.every((q, index) => {
      const questionValue = formValue[q.questionNo];
      if (!questionValue?.optionNos?.length) {
        error = `请完成第${index + 1}题`;
        return false;
      }
      if (questionValue?.error) {
        error = questionValue.error;
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
      const answers = questionValue.optionNos.map(o => ({
        questionNo: q.questionNo,
        optionNo: o,
        otherText: questionValue.otherText?.[o],
      }));
      return values.concat(answers);
    }, []);
    if (typeof onFinish === 'function') {
      onFinish(submitValue);
    }
  };

  return (
    <div>
      <Divider>{questionBankName}</Divider>
      <Form form={form} layout="vertical">
        {React.createElement(
          readOnly ? 'div' : Carousel,
          readOnly ? null : {
            className: "td-medical-question-form-carousel",
            ref: carouselRef,
            dots: false,
            easing: "ease-in",
          },
          currentQuestions.map((q, index) => {
            const Component = QUESTION_TYPE[q.questionType];
            return (
              <Form.Item
                key={q.questionNo}
                label={`${index + 1}. ${q.questionName}`}
                name={q.questionNo}
              >
                <Component readOnly={readOnly} options={q.optionList} onChange={handleFillQuestion} />
              </Form.Item>
            );
          })
        )}
      </Form>
      {footerHidden ? null : (
        <div className="td-medical-question-form-navigation">
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
              <Button type="primary" onClick={onSubmit} disabled={!canSubmit()}>
                完成
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
