<script>
import axios from "axios";
import { store } from "../store";

export default {
  name: "AppHeader",
  data() {
    return {
      store,
    };
  },

  methods: {
    async logout() {
      try {
        const res = await axios.post("http://localhost:8000/api/logout");
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
  <header class="text-red-900 py-6 flex flex-col gap-3 items-center">
    <div class="logo font-bold text-4xl cursor-pointer">TriPlanner</div>
    <a
      href="http://localhost:8000/login"
      class="bg-red-900 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      Login
    </a>

    <a
      href="http://localhost:8000/register"
      class="bg-red-900 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      Register
    </a>
    <button
      @click="logout"
      class="bg-red-900 text-gray-100 p-2 text-lg font-semibold rounded-lg"
    >
      Logout
    </button>
  </header>
</template>
<style scoped></style>
