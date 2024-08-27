<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import axios from "axios";
import { store } from "./store";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  name: "App",
  data() {
    return {
      store,
    };
  },

  beforeMount() {
    axios.get(`${store.backendUrl}/api/user`).then((response) => {
      console.log(response);
      store.user = response.data;
    });
  },
};
</script>
<template>
  <!-- Site Header -->
  <AppHeader />

  <!-- Site Main -->
  <RouterView />

  <!-- Site Footer -->
  <AppFooter />
</template>
<style scoped></style>
