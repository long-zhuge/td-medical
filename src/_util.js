// 判断数据类型
import tools from 'td-antd/es/tools';

const { typeOf } = tools;

// 是否为移动端
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 简易版克隆数据
export const clone = (data) => JSON.parse(JSON.stringify(data));

// 将 "#111#222#333#" 转为 [111, 222, 333]
export const toMap = (string = '') => {
  return string
    .replace(/↵/g, '')
    .replace(/[\r\n]/g, '')
    .trim()
    .split('#')
    .filter(i => i.trim() !== '');
};

/*
* 将字符串正则转为正则函数
* PS：由于 \\ 符号的特殊性，在数据存储中，会将其转为 // 进行存储，故在进行正则函数转化时，先进行替换
* */
export function regExp(str = '') {
  return new RegExp(str.replace(/\/\//g, '\\'));
}

// 从 valueToName 中过滤出 name 值，并加上 index，如：bloodPressure_max_0
export function getFormName(text = '', index = 0, isIndex = true) {
  return text.split(',').reduce((p, c) => {
    const name = c.split('=')[1];
    const key = isIndex ? `${name}_${index}` : name;

    return [...p, key];
  }, [])
}

// 从 dataObject 中获取对应字段的值，并进行容错处理
export function renderValue(params = {}) {
  const { dataObject = {}, keys = [], unit = '' } = params;

  if (dataObject[keys[0]]) {
    return keys.length >= 2 ? `${dataObject[keys[0]]} / ${dataObject[keys[1]]} ${unit}` : `${dataObject[keys]} ${unit}`;
  }

  return '--';
}

/*
* 重组 form 生成的 values，详细介绍，请查看文档
* */
export function outPutFormValues(currentValues = {}, fieldList = []) {
  const values = {};

  // 将 { bloodPressure_min_0: 60, bloodPressure_max_0: 90 } 转为 ['bloodPressure_min_0', 'bloodPressure_max_0'] 进行遍历
  Object.keys(currentValues).forEach(item => {
    /*
    * 将类似 bloodPressure_max_0 的字段进行拆分
    *   1、下标为 0 的是字段名
    *   2、当 valueTypeIsList = true 时，下标倒数第二为 index，下标倒数第一为组件中 table 的 dataSource 位置
    *   3、当 valueTypeIsList = false 时，下标倒数第一为 index
    * */
    const keys = item.split('_');

    // 当 fieldList 中的对象的 en 等于 keys[0] 字段时，获取到数据对象
    const obj = fieldList.filter(i => i.en === keys[0])[0];

    // valueType 是否等于 list
    const valueTypeIsList = obj.valueType === 'list';

    if (valueTypeIsList) {
      // 用于真实输出到 form.values 中的 key，由 en + keys下标倒数第二位置的值
      const key = `${obj.en}_${keys.slice(-2)[0]}`;
      const previousObj = values[key];
      const valuesKey = keys.length > 3 ? keys.slice(0, 2).join('_') : keys.slice(0, 1)[0];

      if (previousObj) {
        previousObj.values.push({
          order: previousObj.values.length,
          [valuesKey]: `${currentValues[item]}`, // 值必须是字符串
        });
      } else {
        values[key] = {
          ...obj,
          values: [
            {
              order: 0,
              [valuesKey]: `${currentValues[item]}`, // 值必须是字符串
            },
          ],
        };
      }
    } else {
      // 如果 valueType=object
      // 用于真实输出到 form.values 中的 key
      const key = `${obj.en}_${keys.pop()}`;

      // 如果当前值已经存在，表明已经组装过一次，那么就无需再组装了，直接赋值即可。注意，赋值的时候不带下标
      const previousObj = values[key];
      const valuesKey = keys.length >= 2 ? keys.join('_') : keys[0];

      if (previousObj) {
        previousObj.values[valuesKey] = currentValues[item];
      } else {
        values[key] = {
          ...obj,
          values: {
            order: 0,
            [valuesKey]: currentValues[item],
          },
        };
      }
    }
  });

  return values;
}

/*
* 对最后获取的真实值做某些处理，如将 'true' 转为 true
* */
const toValue = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

/*
* 将 outPutFormValues 进行逆重组
* */
export function getFormValues(data = {}, fieldList = [], index = 0) {
  const fieldsValue = {};
  let newDataSource;

  // 遍历元件列表
  fieldList.forEach(item => {
    // 从 data 数据中获取对应组件的 values 值
    const { values } = data[`${item.en}_${index}`] || {};

    if (typeOf(values, 'Object')) {
      Object.keys(values).forEach(key => {
        if (key !== 'order') {
          // 真实值获取后，需要判断是否为字符串的布尔值，如果是，则需要转为布尔值
          fieldsValue[`${key}_${index}`] = toValue(values[key]);
        }
      });
    } else if (typeOf(values, 'Array')) {
      // 对 newDataSource 进行赋值，这样就可以渲染列表了
      if (!newDataSource) {
        newDataSource = values;
      }

      values.forEach(value => {
        Object.keys(value).forEach(key => {
          if (key !== 'order') {
            fieldsValue[`${key}_${index}_${value.order}`] = toValue(value[key]);
          }
        });
      });
    }
  });

  return {
    values: fieldsValue,
    newDataSource,
  };
}

// 从组件map对象中筛选出当前要渲染的组件
export function filterEleMapToComponent(ele, modeEn) {
  let Component;

  Object.keys(ele).some(key => {
    if (key.includes(modeEn)) {
      Component = ele[key];
      return true;
    }
    return false;
  });

  return Component;
}
