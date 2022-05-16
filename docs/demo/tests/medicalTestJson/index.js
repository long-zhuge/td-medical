import React, { useState } from 'react';
import { Button } from 'antd';
import clipboard from 'td-antd/es/tools/clipboard';
import elementListJson from 'td-medical/medical-editor/elementList.json';
import mpFieldJson from './mp_field.json';

const prompt = (text) => {
  return new Promise((resolve) => {
    const data = window.prompt(text);

    if (data) {
      const res = data
        .replaceAll('总胆红素（TBIL）', '总胆红素(TBIL)')
        .replaceAll('出生日期', '出生年月');

      resolve(res);
    }
  });
};

const Demo = () => {
  const [dataObject, setDataObject] = useState();   // 对象集合

  // 检测组件字段是否正确，是否有重复：enName、fieldNo
  const testElement = () => {
    const eleEnNames = [];      // 大组件 enName
    const elementNos = [];      // 大组件编号
    const enNames = [];         // 字段 enName
    const fieldNos = [];        // 字段 fieldNo

    const error = [];        // 错误信息

    elementListJson.forEach(({ fieldList = [], ...ele }) => {
      // 校验组件英文名
      if (eleEnNames.includes(ele.enName)) {
        error.push(ele.enName);
      } else {
        eleEnNames.push(ele.enName)
      }

      // 校验组件编号
      if (elementNos.includes(ele.elementNo)) {
        error.push(ele.elementNo);
      } else {
        elementNos.push(ele.elementNo)
      }


      fieldList.forEach(({ fieldNo, enName }) => {
        if (enNames.includes(enName)) {
          error.push(enName);
        } else {
          enNames.push(enName);
        }

        if (fieldNos.includes(fieldNo)) {
          error.push(fieldNo);
        } else {
          fieldNos.push(fieldNo);
        }
      })
    });

    if (error[0]) {
      alert(`错误：${error.toString()}`);
    } else {
      alert('校验通过');
    }
  };

  // 将 elementListJson 导出出为以 field 为 key 的 json 数据
  const copyObj = (field = '') => {
    const obj = elementListJson.reduce((p, c) => {
      const obj2 = c.fieldList.reduce((p2, c2) => {
        p2[c2[field]] = c2;

        return p2;
      }, {});

      return {...p, ...obj2};
    }, {});

    clipboard(JSON.stringify(obj)).then(() => {
      alert('已复制到剪贴板');
      setDataObject(obj);
    })
  };

  // 生成用于 mp_field 的 json 数据
  const copyFields = () => {
    const obj = mpFieldJson.reduce((p, c) => ({...p, [c.field_no]: c}), {});
    const json = elementListJson.reduce((p, c) => [...p, ...c.fieldList], []);

    const json2 = json.map(({ cnName, enName, fieldNo, inputType, valueToName, valueType, unit = '', map = '' }) => {
      const currentObj = obj[fieldNo] || {};

      return {
        field_no: fieldNo,
        cn_name: cnName,
        en_name: enName,
        input_type: inputType,
        map,
        unit,
        value_to_name: valueToName,
        value_type: valueType,
        ...currentObj,
      }
    });

    clipboard(JSON.stringify(json2)).then(() => {
      alert('pass');
    });
  };

  const filterRecordData = () => {
    prompt('请输入需要清洗的 record 数据').then((response) => {
      try {
        const error = [];
        const filter = [];

        JSON.parse(response).forEach(item => {
          const itemData = dataObject[item.cnName];

          if (!itemData) {
            error.push(item);
          } else {
            filter.push({
              ...item,
              ...itemData,
            })
          }
        });

        if (error[0]) {
          clipboard(JSON.stringify(error)).then(() => {
            alert('有错误：已复制到剪贴板');
          })
        } else {
          clipboard(JSON.stringify(filter)).then(() => {
            alert('pass');
          });
        }
      } catch (e) {
        alert(e);
      }
    });
  };

  const filterTemplateData = () => {
    prompt('请输入需要清洗的 template 数据').then((response) => {
      try {
        const error = [];

        const filter = JSON.parse(response).reduce((p, c) => {
          const filterTemplate = c.template.reduce((p2, c2) => {
            const filterFieldList = c2.fieldList.reduce((p3, c3) => {
              const itemData = dataObject[c3.cnName];

              if (itemData) {
                return [...p3, {...c3, ...itemData, required: c3.required}]
              } else {
                error.push(c3);
              }

              return p3;
            }, []);

            return [...p2, {...c2, fieldList: filterFieldList}]
          }, []);

          return [...p, {...c, template: filterTemplate}];
        }, []);

        if (error[0]) {
          clipboard(JSON.stringify(error)).then(() => {
            alert('有错误：已复制到剪贴板');
          })
        } else {
          clipboard(JSON.stringify(filter)).then(() => {
            alert('pass');
          });
        }
      } catch (e) {
        alert(e);
      }
    });
  };

  return (
    <>
      <Button onClick={testElement}>检测组件字段</Button><br /><br />
      <Button onClick={() => copyObj('enName')}>复制对象集合（enName）</Button><br /><br />
      <Button onClick={() => copyObj('cnName')}>复制对象集合（cnName）</Button><br /><br />
      <Button onClick={() => copyObj('fieldNo')}>复制对象集合（fieldNo）</Button><br /><br />
      <Button onClick={() => copyFields()}>mp_field</Button><br /><br />
      <Button onClick={filterRecordData}>清洗数据（record）</Button><br /><br />
      <Button onClick={filterTemplateData}>清洗数据（template）</Button><br /><br />
    </>
  );
};

export default Demo;
