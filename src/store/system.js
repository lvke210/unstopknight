export default {
  state: {
    deadVisible: false,
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
