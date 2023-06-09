/*
* 主容易分发
* */
import { useState } from 'react';

// 编辑组件
import Nrs from './write/Nrs';
import Inspect from './write/Inspect';
import BaseList from './write/BaseList';
import MapScore from './write/MapScore';
import BaseTable from './write/BaseTable';
import SemenRoutineQuota from './write/SemenRoutineQuota';
import MapScoreImprove from './write/MapScoreImprove';
import ReproductiveHistory from './write/ReproductiveHistory';

// 只读组件
import Nrs2 from './readOnly/Nrs';
import Inspect2 from './readOnly/Inspect';
import BaseList2 from './readOnly/BaseList';
import MapScore2 from './readOnly/MapScore';
import BaseTable2 from './readOnly/BaseTable';
import SemenRoutineQuota2 from './readOnly/SemenRoutineQuota';
import MapScoreImprove2 from './readOnly/MapScoreImprove';
import ReproductiveHistory2 from './readOnly/ReproductiveHistory';

const writeList = [BaseList, BaseTable, Inspect, SemenRoutineQuota, Nrs, MapScore, MapScoreImprove, ReproductiveHistory];
const readOnlyList = [BaseList2, BaseTable2, Inspect2, SemenRoutineQuota2, Nrs2, MapScore2, MapScoreImprove2, ReproductiveHistory2];
export const containerElementConfig = (components = []) => {
  return {
    // 基本信息、生命体征、门诊主体
    'base|outpatientContent': components[0],
    // 合并用药
    'combinedMedication|SFDA': components[1],
    // 血常规、尿常规、肝肾功能检查
    'routineBloodTest|urinalysis|liverKidneyTest|serumExamination|myocardialEnzymeLevel': components[2],
    // 精液常规检查指标（semenRoutineQuota）、精液增加检查指标
    'semenRoutineQuotaAdd': components[3],
    // NRS 评分
    'NRS': components[4],
    // 神经痛、外周运动神经障碍、外周感觉神经障碍、生活质量评分、儿童手足口病等级、痤疮等级评估
    'neuralgia|PMND|PSND|QLS|CHFMD|AcneGrade': components[5],
    // 评分改善组件
    'IQLS|ISL': components[6],
    // 生育史
    'ReproductiveHistory': components[7],
  }
};

const Container = ({ mothod = 'write', enName = '', ...rest }) => {
  const [ele] = useState(containerElementConfig(mothod === 'write' ? writeList : readOnlyList));

  const component = ele[Object.keys(ele).find(i => i.includes(enName))];

  if (component) {
    return rest.children(component);
  }

  alert(`${enName} 组件未配置`);
  return null;
};

export default Container;
