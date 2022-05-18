import { createStore } from "vuex";

export default createStore({
  state: {
    levelCur: 1, //等级
    levelMax: 1000,
    bloodCur: 200, //血量
    bloodMax: 1000,
    magicCur: 300, //蓝量
    magicMax: 1000,
    userName: "小小勇者", //角色名
    secondName: "冒险家", //称号
    attack: 100,
    defence: 100,
  },
  getters: {},
  mutations: {
    CHANGEDATA: (state, data) => {
      const { type, value } = data;
      state[type] = value;
    },
  },
  actions: {
    change: ({ commit }, data) => {
      commit("CHANGEDATA", data);
    },
  },
  modules: {},
});
