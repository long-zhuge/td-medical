/*
* 生育史
* */

import React from 'react';
import FormItem from 'td-antd/es/form-item';
import FormBox from '../../FormBox';
import { Number, Select } from '../../_components';

const ReproductiveHistory = (props) => {
  const {
    index = 0,
    fieldList = [],
  } = props;

  const field = `${fieldList[0].enName}_${index}`;  // 既往是否妊娠
  const field4 = `${fieldList[4].enName}_${index}`; // 妊娠结局

  return (
    <FormBox {...props}>
      <Select
        name={field}
        label={fieldList[0].cnName}
        {...fieldList[0]}
      />
      <FormItem.Update names={[field]}>
        {(res) => {
          if (res[field] === '是') {
            return (
              <React.Fragment>
                <Number
                  name={`${fieldList[1].enName}_${index}`}
                  label={fieldList[1].cnName}
                  {...fieldList[1]}
                />
                <Number
                  name={`${fieldList[2].enName}_${index}`}
                  label={fieldList[2].cnName}
                  {...fieldList[2]}
                />
                <Number
                  name={`${fieldList[3].enName}_${index}`}
                  label={fieldList[3].cnName}
                  {...fieldList[3]}
                />
                <Select
                  name={`${fieldList[4].enName}_${index}`}
                  label={fieldList[4].cnName}
                  {...fieldList[4]}
                />
                <FormItem.Update names={[field4]}>
                  {(res2) => {
                    if (res2[field4]?.includes('人工流产或清宫')) {
                      return (
                        <React.Fragment>
                          <Select
                            name={`${fieldList[5].enName}_${index}`}
                            label={fieldList[5].cnName}
                            {...fieldList[5]}
                          />
                        </React.Fragment>
                      );
                    }
                  }}
                </FormItem.Update>
              </React.Fragment>
            );
          }

          if (res[field] === '否') {
            return (
              <React.Fragment>
                <Select
                  name={`${fieldList[6].enName}_${index}`}
                  label={fieldList[6].cnName}
                  {...fieldList[6]}
                />
                <Select
                  name={`${fieldList[7].enName}_${index}`}
                  label={fieldList[7].cnName}
                  {...fieldList[7]}
                />
              </React.Fragment>
            );
          }
        }}
      </FormItem.Update>
    </FormBox>
  );
};

export default ReproductiveHistory;
