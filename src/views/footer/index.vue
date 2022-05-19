<template>
  <div class="footer-wrap" @click="showModal">
    <div class="footer-item" v-for="item in pageData" :key="item">
      {{ item }}
    </div>
  </div>
  <Modal :visible="heroVisible" title="角色" :cancel="closeModal"> <Hero /> </Modal>
</template>
<script setup>
import { ref } from "vue";
import Modal from "../../components/modal.vue";
import Hero from "./hero.vue";
let heroVisible = ref(false);
const pageData = ["角色", "伙伴", "关卡", "背包", "商城"];

function showModal(e) {
  const type = e.target.innerText;
  switch (type) {
    case "角色":
      heroVisible.value = true;
      break;
    default:
      null;
  }
}
function closeModal() {
  heroVisible.value = false;
}
</script>
<style scoped>
.footer-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.footer-item {
  width: 6vh;
  height: 6vh;
  text-align: center;
  display: grid;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  background: #dddddd82;
}
</style>
