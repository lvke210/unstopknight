<template>
  <div class="hero">
    <div>生命:{{ store.state.bloodCur }}/{{ store.state.bloodMax }}</div>
    <div>法力:{{ store.state.magicCur }}/{{ store.state.magicMax }}</div>
    <div>攻击:{{ store.state.attack }}</div>
    <div>攻速:{{ store.state.speed }}</div>
    <div>吸血:{{ store.state.sucking }}</div>
    <div>防御:{{ store.state.defence }}</div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>
