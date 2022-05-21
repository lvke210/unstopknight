const local = JSON.parse(localStorage.getItem("state"));
const state = local.enemy;

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
