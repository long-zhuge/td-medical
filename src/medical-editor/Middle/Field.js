import React, { useState, useEffect, useContext } from 'react';
import cx from 'classnames';
import FormOutlined from '@ant-design/icons/FormOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { Space } from 'antd';
import { permission } from '../../_util';
import './index.less';

import { EditorContext } from '../index';

const Field = ({ data = {}, index, index2, method }) => {
  const { rightForm, dispatch } = useContext(EditorContext);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!!data.disabled);
  }, [data.disabled]);

  const onDisabled = () => {
    permission({ method }).then(() => {
      setDisabled(!disabled);
      data.disabled = !disabled;
    });
  };

  // 设置字段进行编辑
  const onForm = () => {
    permission({ method }).then(() => {
      rightForm.resetFields();
      data.index = index;
      data.index2 = index2;
      dispatch('FORM_DATA', {
        ...data,
        required: !!data.required,
        analysis: !!data.analysis,
      });
    });
  };

  return (
    <div
      className={cx('middle-item-content-field', {
        'middle-item-content-field-required': data.required,
      })}
    >
      <span
        className={cx({
          'middle-item-content-field-disabled': disabled,
        })}
      >{data.cnName}
      </span>
      <div className="middle-item-content-field-mask">
        {disabled ? <EyeOutlined onClick={onDisabled} /> : (
          <Space>
            <FormOutlined onClick={onForm} />
            <EyeInvisibleOutlined onClick={onDisabled} />
          </Space>
        )}
      </div>
    </div>
  );
};

export default Field;
