// 判断数据类型
import typeOf from 'td-antd/es/tools/typeOf';
import genNonDuplicateID from 'td-antd/es/tools/genNonDuplicateID';

// 是否为移动端
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 简易版克隆数据
export const clone = (data) => JSON.parse(JSON.stringify(data));

// 统一的浮层
export const confirm = (text = '') => {
  return new Promise((resolve) => {
    if (window.confirm(text)) {
      resolve();
    }
  });
};

// 获取随机 id
export const genId = () => genNonDuplicateID(6);

// 将 "#111#222#333#" 转为 [111, 222, 333]
export const toMap = (string = '') => {
  return string
    .replace(/↵/g, '')
    .replace(/[\r\n]/g, '')
    .trim()
    .split('#')
    .filter(i => i.trim() !== '');
};

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

  const values = keys.reduce((p, c) => {
    const value = dataObject[c] || '';

    if (p) {
      return value ? `${p} / ${value}` : p;
    }

    return value;
  }, '');

  return values ? `${values} ${unit}`.trim() : '';
}

/*
* 重组 form 生成的 values，详细介绍，请查看文档
*   currentValues: 当前表单字段的 values
*   fieldList: 当前组件列表
*   mainParams: 主对象属性
* */
export function outPutFormValues(currentValues = {}, fieldList = [], mainParams = {}) {
  const values = {};

  // 将 { bloodPressure_min_0: 60, bloodPressure_max_0: 90 } 转为 ['bloodPressure_min_0', 'bloodPressure_max_0'] 进行遍历
  Object.keys(currentValues).forEach(item => {
    /*
    * 当前的值，必须是字符串
    * PS：如果原始值是 [01, 01.01]，则会被转化为字符串的 01,01.01
    * */
    const currentValue = `${currentValues[item] || ''}`;
    if (!currentValue) return;

    /*
    * 将类似 bloodPressure_max_0 的字段进行拆分
    *   1、下标为 0 的是字段名
    *   2、当 valueTypeIsList = true 时，下标倒数第二为 index，下标倒数第一为组件中 table 的 dataSource 位置
    *   3、当 valueTypeIsList = false 时，下标倒数第一为 index
    * */
    const keys = item.split('_');

    // 当 fieldList 中的对象的 enName 等于 keys[0] 字段时，获取到数据对象
    const obj = fieldList.find(i => i.enName === keys[0]);

    // 当 obj 对象无法获取到时，返回
    if (!obj) return;

    // valueType 是否等于 list
    const valueTypeIsList = obj.valueType === 'list';

    if (valueTypeIsList) {
      // 用于真实输出到 form.values 中的 key，由 enName + keys下标倒数第二位置的值
      const key = `${obj.enName}_${keys.slice(-2)[0]}`;
      const previousObj = values[key];
      const valuesKey = keys.length > 3 ? keys.slice(0, 2).join('_') : keys.slice(0, 1)[0];

      if (previousObj) {
        previousObj.values.push({
          order: previousObj.values.length,
          [valuesKey]: currentValue, // 值必须是字符串
        });
      } else {
        values[key] = {
          ...obj,
          ...mainParams,
          values: [
            {
              order: 0,
              [valuesKey]: currentValue, // 值必须是字符串
            },
          ],
        };
      }
    } else {
      // 如果 valueType=object
      // 用于真实输出到 form.values 中的 key
      const key = `${obj.enName}_${keys.pop()}`;

      // 如果当前值已经存在，表明已经组装过一次，那么就无需再组装了，直接赋值即可。注意，赋值的时候不带下标
      const previousObj = values[key];
      const valuesKey = keys.length >= 2 ? keys.join('_') : keys[0];

      if (previousObj) {
        previousObj.values[valuesKey] = currentValue;
      } else {
        values[key] = {
          ...obj,
          ...mainParams,
          values: {
            order: 0,
            [valuesKey]: currentValue,
          },
        };
      }
    }
  });

  return values;
}

/*
* 对最后获取的真实值做某些处理
*  1、将 'true' 转为 true
*  2、将 '01,01.01' 转为 [01, 01.01]
* */
const toValue = (value, inputType) => {
  const specialInputType = ['cascader'];

  try {
    if (specialInputType.includes(inputType)) {
      return value.split(',');
    }
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
    const { values } = data[`${item.enName}_${index}`] || {};

    if (typeOf(values, 'Object')) {
      Object.keys(values).forEach(key => {
        if (key !== 'order') {
          // 真实值获取后，需要判断是否为字符串的布尔值，如果是，则需要转为布尔值
          fieldsValue[`${key}_${index}`] = toValue(values[key], item.inputType);
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
            fieldsValue[`${key}_${index}_${value.order}`] = toValue(value[key], item.inputType);
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
export function filterEleMapToComponent(ele, enName) {
  const key = Object.keys(ele).find(i => i.includes(enName));

  return ele[key];
}

// 如果是移动端，则 table 样式的组件请添加如下属性
export const mobileTableProps = isMobile && { size: 'small', scroll: { x: 1000 }, title: () => '右滑还有内容哦' };

// 哪些组件需要平铺展示，如：门诊主体、项目说明等等
export const isTileComponent = (enName) => ['outpatientContent', 'projectDesc'].includes(enName);

/*
* 将 map 字符串转为 score 对象
* PS：轻度疼痛/1\n中度症状，影响工具性日常生活活动/2 ==> [{ kps: '轻度疼痛', score: 1 }, { kps: '中度症状，影响工具性日常生活活动', score: 2 }]
* */
export const mapToScore = (map = '') => {
  let mapList = [];

  try {
    mapList = map.split('\n').reduce((p, c) => {
      const arr = c.split('/');

      return [...p, { kps: arr[0], score: arr[1] }];
    }, [])
  } catch (error) {
    console.log(error)
  }

  return mapList;
};

/*
* 将 id 转换为 中文
* */
export const idTransformString = (id = '', flatData = {}) => {
  return id.split(',').map(i => flatData[i]).join('-');
};

/*
* 获取评分组件配置项
* */
export const getMapScoreConfig = (enName) => {
  const DEFAULT = {
    titleTemplate: '临床表现',
    titleTemplate2: '分值',
    valueTemplate: '$1',
  };
  const CONFIG = {
    'PSND|PMND|neuralgia': {
      titleTemplate2: '分级',
      valueTemplate: '$1级',
    },
    'CHFMD': {
      titleTemplate2: '等级',
      valueTemplate: '第$1期',
    },
    'AcneGrade': {
      titleTemplate2: '等级',
      valueTemplate: '$1级',
    },
  };

  const key = Object.keys(CONFIG).find(i => i.includes(enName));

  return {...DEFAULT, ...CONFIG[key]};
};
