export default [
  {
    "cnName": "生活质量评分",
    "elementNo": "E00014",
    "method": "special",
    "enName": "QLS",
    "fieldList": [
      {
        "cnName": "生活质量评分",
        "enName": "QLS",
        "fieldNo": "F00067",
        "inputType": "radio",
        "map": "正常，无症状和体征/100\n能进行正常活动，有轻微症状和体征/90\n勉强可进行正常活动，有一些症状或体征/80\n生活可自理，但不能维持正常生活工作/70\n生活能大部分自理，但偶尔需要别人帮助/60\n常需人照料/50\n生活不能自理，需要特别照顾和帮助/40\n生活严重不能自理/30\n病重，需要住院和积极的支持治疗/20\n重危，临近死亡/10\n死亡/0",
        "meddra": "",
        "remarks": "",
        "rule": "",
        "unit": "",
        "valueToName": "value1=QLS",
        "valueType": "object",
        "required": true
      }
    ],
    "meddra": "",
    "remarks": ""
  },
  {
    "cnName": "外周感觉神经障碍",
    "elementNo": "E00015",
    "method": "special",
    "enName": "PSND",
    "fieldList": [
      {
        "cnName": "外周感觉神经障碍",
        "enName": "PSND",
        "fieldNo": "F00068",
        "inputType": "radio",
        "map": "无症状，没有深腱反射丧失或感觉异常/1\n中度症状，影响工具性日常生活活动/2\n重度症状，影响个人日常生活活动/3\n危及生命，需紧急处理/4\n死亡/5",
        "meddra": "",
        "remarks": "",
        "rule": "",
        "unit": "",
        "valueToName": "value1=PSND",
        "valueType": "object",
        "required": true
      }
    ],
    "meddra": "",
    "remarks": ""
  },
  {
    "cnName": "外周运动神经障碍",
    "elementNo": "E00016",
    "method": "special",
    "enName": "PMND",
    "fieldList": [
      {
        "cnName": "外周运动神经障碍",
        "enName": "PMND",
        "fieldNo": "F00069",
        "inputType": "radio",
        "map": "无症状，仅临床检查或诊断所见，无需治疗/1\n中度症状，影响工具性日常生活活动/2\n重度症状，日常生活自理受限，需要辅助装置/3\n危及生命，需紧急处理/4\n死亡/5",
        "meddra": "",
        "remarks": "",
        "rule": "",
        "unit": "",
        "valueToName": "value1=PMND",
        "valueType": "object",
        "required": true
      }
    ],
    "meddra": "",
    "remarks": ""
  },
  {
    "cnName": "神经痛",
    "elementNo": "E00017",
    "method": "special",
    "enName": "neuralgia",
    "fieldList": [
      {
        "cnName": "神经痛",
        "enName": "neuralgia",
        "fieldNo": "F00070",
        "inputType": "radio",
        "map": "轻度疼痛/1\n中度症状，影响工具性日常生活活动/2\n重度症状，影响个人日常生活活动/3",
        "meddra": "",
        "remarks": "",
        "rule": "",
        "unit": "",
        "valueToName": "value1=neuralgia",
        "valueType": "object",
        "required": true
      }
    ],
    "meddra": "",
    "remarks": ""
  }
];
