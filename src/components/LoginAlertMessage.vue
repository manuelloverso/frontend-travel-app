<script>
import { store } from "../store";

export default {
  name: "LoginAlertMessage",

  data() {
    return {
      store,
    };
  },
};
</script>
<template>
  <h2 class="text-4xl font-semibold" v-if="store.isExpired">
    Your session has expired
  </h2>

  <h2 class="text-4xl font-semibold">You're not logged in 😞</h2>
  <RouterLink
    class="text-lg text-orange-700 font-medium underline"
    :to="{ name: 'login' }"
  >
    Login or register here
  </RouterLink>
</template>
<style scoped></style>
