import React, { useState } from 'react';
import { Button } from 'antd';
import clipboard from 'td-antd/es/tools/clipboard';
import elementListJson from 'td-medical/medical-editor/elementList.json';

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
    const arr = [];
    const errorArr = [];

    elementListJson.forEach(({ fieldList = [] }) => {
      fieldList.forEach(({ fieldNo, enName }) => {
        if (arr.includes(fieldNo)) {
          errorArr.push(fieldNo);
        } else {
          arr.push(fieldNo)
        }

        if (arr.includes(enName)) {
          errorArr.push(enName);
        } else {
          arr.push(enName)
        }
      })
    });

    if (errorArr[0]) {
      alert(`错误组件：${errorArr.toString()}`);
    } else {
      alert('pass');
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
              const itemData = dataObject[c3.enName];

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
      <Button onClick={filterRecordData}>清洗数据（record）</Button><br /><br />
      <Button onClick={filterTemplateData}>清洗数据（template）</Button><br /><br />
    </>
  );
};

export default Demo;
