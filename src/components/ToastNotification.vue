<script>
import { store } from "../store";

export default {
  name: "ToastNotification",
  data() {
    return {
      store,
    };
  },

  computed: {
    toast() {
      return store.toastNotify;
    },
  },

  mounted() {
    setTimeout(() => {
      store.toastNotify.isShowing = false;
    }, 4000);
  },
};
</script>
<template>
  <div class="toast-container">
    <p class="text-lg p-4">{{ toast.text }}</p>
    <div class="bar-track">
      <div
        class="bar-progress"
        :class="toast.success ? 'bg-green-500' : 'bg-red-500'"
      ></div>
    </div>
  </div>
</template>
<style scoped>
.toast-container {
  border-radius: 10px;
  position: fixed;
  top: 130px;
  right: 80px;
  background: rgba(255, 255, 255, 0.597);
  backdrop-filter: blur(3px);
  z-index: 50;

  .bar-track {
    border-radius: 10px;
    padding: 0 4px;
    height: 5px;

    .bar-progress {
      height: 100%;
      border-radius: 5px;
      animation: bar-progress 4s linear;
    }
  }
}

@keyframes bar-progress {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}
</style>
