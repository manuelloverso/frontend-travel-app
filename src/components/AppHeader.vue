<script>
import axios from "axios";
import { store } from "../store";
import AppLogo from "./AppLogo.vue";

export default {
  name: "AppHeader",
  components: {
    AppLogo,
  },
  data() {
    return {
      store,
    };
  },

  methods: {
    async logout() {
      try {
        const res = await axios.post(`${store.backendUrl}/api/logout`);
        console.log(res);
        if (res.data.success) store.user = null;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
<template>
  <header class="py-6 flex flex-col gap-3 items-center">
    <RouterLink :to="{ name: 'home' }"><AppLogo :withText="true" /></RouterLink>
    <RouterLink
      :to="{ name: 'login' }"
      class="bg-orange-500 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      Login
    </RouterLink>

    <RouterLink
      :to="{ name: 'register' }"
      class="bg-orange-500 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      Register
    </RouterLink>

    <RouterLink
      :to="{ name: 'trips' }"
      class="bg-orange-500 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      My trips
    </RouterLink>
    <button
      @click="logout"
      class="bg-orange-500 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      Logout
    </button>
  </header>
</template>
<style scoped></style>
