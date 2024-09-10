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
  <div class="toast-container slide-in-elliptic-top-fwd">
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
  box-shadow: 0 0 10px -3px;

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

.slide-in-elliptic-top-fwd {
  -webkit-animation: slide-in-elliptic-top-fwd 0.7s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
}

@-webkit-keyframes slide-in-elliptic-top-fwd {
  0% {
    -webkit-transform: translateY(-600px) rotateX(-30deg) scale(0);
    transform: translateY(-600px) rotateX(-30deg) scale(0);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) rotateX(0) scale(1);
    transform: translateY(0) rotateX(0) scale(1);
    -webkit-transform-origin: 50% 1400px;
    transform-origin: 50% 1400px;
    opacity: 1;
  }
}
@keyframes slide-in-elliptic-top-fwd {
  0% {
    -webkit-transform: translateY(-600px) rotateX(-30deg) scale(0);
    transform: translateY(-600px) rotateX(-30deg) scale(0);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) rotateX(0) scale(1);
    transform: translateY(0) rotateX(0) scale(1);
    -webkit-transform-origin: 50% 1400px;
    transform-origin: 50% 1400px;
    opacity: 1;
  }
}
</style>
