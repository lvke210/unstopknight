import { createStore } from "vuex";

export default createStore({
  state: {
    baseData: {
      level: { cur: 0, max: 1000 },
      blood: { cur: 200, max: 1000 },
      magic: { cur: 100, max: 1000 },
    },
    count: 0,
  },
  getters: {},
  mutations: {
    CHANGEBASEDATA: (state, data) => {
      console.log("mutations");
      state.baseData.blood = data;
    },
    ADD(state) {
      state.count = state.count + 1;
    },
  },
  actions: {
    changeBaseData: ({ commit }, data) => {
      console.log("actions");
      commit("CHANGEBASEDATA", data);
    },
    add({ commit }) {
      commit("ADD");
    },
  },
  modules: {},
});
