const local = JSON.parse(localStorage.getItem("state"));
const state = local.system;
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
