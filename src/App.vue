<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import ToastNotification from "./components/ToastNotification.vue";
import axios from "axios";
import { store } from "./store";

export default {
  components: {
    AppHeader,
    AppFooter,
    ToastNotification,
  },
  name: "App",
  data() {
    return {
      store,
    };
  },

  methods: {
    async IsAuthenticated() {
      try {
        const res = await axios.get(`${store.backendUrl}/api/user`);
        store.setAuthStatus(res.data, true, false);
      } catch (err) {
        console.error(err);
      }
    },
  },

  beforeMount() {
    this.IsAuthenticated();
  },
};
</script>
<template>
  <ToastNotification v-if="store.toastNotify.isShowing" />

  <!-- Site Header -->
  <AppHeader />

  <!-- Site Main -->
  <RouterView />

  <!-- Site Footer -->
  <AppFooter />
</template>
<style scoped></style>
