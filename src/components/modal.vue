<template>
  <div
    class="modal"
    :style="{ '--width': props.width, '--visible': props.visible ? 'block' : 'none' }"
  >
    <div class="modal-wrap">
      <div class="modal-title">{{ title }}</div>
      <div class="modal-content">{{ content }}</div>
      <div class="modal-footer" @click="hangdleClick">确定</div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  width: {
    default: "80%",
  },
  title: {
    default: "提示",
  },
  content: {
    default: "...",
  },
  visible: {
    required: true,
    type: Boolean,
  },
  change: {
    type: Function,
    required: true,
  },
});

function hangdleClick() {
  props.change();
}
</script>
<style scoped>
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.911);
  width: var(--width);
  border-radius: 0.5rem;
  display: var(--visible);
}
.modal-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(0, 0, 0, 0.856);

  font-size: 0.9rem;
}
.modal div {
}
.modal-title {
  width: 100%;
}
.modal-content {
  text-align: center;
  height: 5rem;
  line-height: 5rem;
}
.modal-footer {
  text-align: right;
  background-color: rgb(116, 189, 238);
  padding: 5px 8px;
  border-radius: 5px;
}
</style>
