import store from "../store";
// 回复
export function recovery() {
  return setInterval(() => {
    store.state.bloodCur < store.state.bloodMax
      ? store.dispatch("change", { type: "bloodCur", value: store.state.bloodCur + 1 })
      : null;
    store.state.magicCur < store.state.magicMax
      ? store.dispatch("change", { type: "magicCur", value: store.state.magicCur + 1 })
      : null;
  }, 1000);
}
