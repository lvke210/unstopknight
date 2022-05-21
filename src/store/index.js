import { createStore } from "vuex";
import enemyState from "./enemy";
import systemState from "./system";
import state from "./hero";

export default createStore({
  state,
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
