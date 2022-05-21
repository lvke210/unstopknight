const local = JSON.parse(localStorage.getItem("state"));
const state = local
  ? local.system
  : {
      stage: 1, // 关卡
      stageCur: 10, // 关卡进度 剩余0 时过关
      stageMax: 10, // 过关所需进度   打一个怪进度 +1,满10个 过一关
      deadVisible: false, //死亡弹窗
      attackStatus: 0, // 0:战斗前,1:战斗中 2:战斗后
    };
export default {
  state,
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
