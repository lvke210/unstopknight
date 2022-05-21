const local = JSON.parse(localStorage.getItem("state"));
const state = local
  ? local.enemy
  : {
      levelCur: 1, //等级
      levelMax: 1000,
      bloodCur: 1000, //血量
      bloodMax: 1000,
      attack: 100,
      defence: 10,
    };

export default {
  state,
  mutations: {
    ENEMYCHANGEDATA: (state, data) => {
      const keys = Object.keys(data);
      keys.forEach((item) => {
        state[item] = data[item];
      });
    },
  },
  actions: {
    enemyChange: ({ commit }, data) => {
      commit("ENEMYCHANGEDATA", data);
    },
  },
};
