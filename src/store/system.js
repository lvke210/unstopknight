export default {
  state: {
    stage: 1, // 关卡
    stageCur: 1, // 关卡进度
    stageMax: 10, // 过关所需进度   打一个怪进度 +1,满10个 过一关
    deadVisible: false, //死亡弹窗
    attackStatus: 1, // 0:战斗前,1:战斗中 2:战斗后
  },
  mutations: {
    SYSTEMCHANGEDATA: (state, data) => {
      const keys = Object.keys(data);
      keys.forEach((item) => {
        state[item] = data[item];
      });
    },
  },
  actions: {
    systemChange: ({ commit }, data) => {
      commit("SYSTEMCHANGEDATA", data);
    },
  },
};
