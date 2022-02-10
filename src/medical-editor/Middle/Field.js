import React, { useState, useContext } from 'react';
import cx from 'classnames';
import FormOutlined from '@ant-design/icons/FormOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { Space } from 'antd';
import './index.less';

import { EditorContext } from '../index';

const Field = ({ data = {}, index, index2 }) => {
  const { setFormData } = useContext(EditorContext);

  const [disabled, setDisabled] = useState(!!data.disabled);

  const onDisabled = () => {
    setDisabled(!disabled);
    data.disabled = !disabled;
  };

  // 设置字段进行编辑
  const onForm = () => {
    data.index = index;
    data.index2 = index2;
    setFormData(data);
  };

  return (
    <div className="middle-item-content-field">
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
