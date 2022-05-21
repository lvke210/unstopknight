import { createStore } from "vuex";
import enemyState from "./enemy";
import systemState from "./system";
export default createStore({
  state: {
    levelCur: 1, //等级
    levelMax: 1000,
    exp: 0, //经验
    upgradeExp: 100,
    bloodCur: 800, //血量
    bloodMax: 1000,
    magicCur: 300, //蓝量
    magicMax: 1000,
    speed: 0.5, //攻速
    attack: 100, //攻击
    defence: 10, //防御
    sucking: 10, //吸血
    userName: "小小勇者", //角色名
    secondName: "冒险家", //称号

    isHeroDead: false,
  },
  getters: {},
  mutations: {
    CHANGEDATA: (state, data) => {
      const keys = Object.keys(data);
      keys.forEach((item) => {
        state[item] = data[item];
      });
    },
  },
  actions: {
    change: ({ commit }, data) => {
      commit("CHANGEDATA", data);
    },
  },
  modules: {
    enemy: enemyState,
    system: systemState,
  },
});
