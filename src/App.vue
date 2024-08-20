<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  name: "App",
  data() {
    return {};
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
