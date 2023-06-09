/*
* 该组件会进行表单数据处理，并将处理后的数据返回给 children
* */
import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import isNonEmptyObject from 'td-antd/es/tools/isNonEmptyObject';
import { getFormValues, getFormName } from '../../_util';

const FormBox = (props) => {
  const {
    cnName,
    index = 0,
    fieldList = [],
    formData = {},
  } = props;

  const [dataObject, setDataObject] = useState({});   // 类似 DescList 所需的数据
  const [dataSource, setDataSource] = useState([]);   // 类型 Table 所属的数据
  const [score, setScore] = useState(null);           // 当前分值

  const setValues = (a = null, b = {}, c = []) => {
    setScore(a)         // 分值组件，如：生活质量评分
    setDataObject(b)    // 类似 DescList 所需的数据
    setDataSource(c)    // 类似 Table 所需的数据
  };

  useEffect(() => {
    if (isNonEmptyObject(formData)) {
      const { values, newDataSource } = getFormValues(formData, fieldList, index);

      const field = getFormName(fieldList[0].valueToName, index)[0];

      setValues(values[field], values, newDataSource);
    } else {
      setValues();
    }
  }, [formData]);

  return (
    <React.Fragment>
      <Divider>{cnName}</Divider>
      {props.children({ dataObject, dataSource, score })}
      <br /><br />
    </React.Fragment>
  );
};

export default FormBox;
