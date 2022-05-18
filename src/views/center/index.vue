<template>
  <div style="color: #fff">
    <div><button @click="hangdleClick">button</button></div>
    {{ store.state.baseData.blood.cur }}
    {{ store.state.count }}
  </div>
</template>
<script setup>
import { useStore } from "vuex";
const store = useStore();
const blood = store.state.baseData.blood;
const newBlood = {
  cur: blood.cur,
  max: blood.max,
};
function hangdleClick() {
  store.dispatch("add");
  console.log("click");
  newBlood.cur += 100;
  console.log(newBlood);
  store.dispatch("changeBaseData", newBlood);
}
</script>
