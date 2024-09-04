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
      isDropdownHidden: true,
    };
  },

  computed: {
    isAuthenticated() {
      return store.isAuthorized;
    },

    getUserName() {
      return store.user.name;
    },
  },

  methods: {
    async logout() {
      try {
        const res = await axios.post(`${store.backendUrl}/api/logout`);
        console.log(res);
        if (res.data.success) store.setAuthStatus(null, false, false);
      } catch (err) {
        console.error(err);
      } finally {
        this.isDropdownHidden = true;
      }
    },
  },
};
</script>
<template>
  <header>
    <nav class="container mx-auto py-5 flex justify-between items-center">
      <RouterLink :to="{ name: 'home' }"
        ><AppLogo :withText="true"
      /></RouterLink>
      <div v-if="isAuthenticated" class="actions flex flex-col gap-3">
        <span
          @click="isDropdownHidden = !isDropdownHidden"
          class="cursor-pointer flex gap-2 items-center"
          >{{ getUserName }}
          <img class="w-3" src="/public/img/caret-down-solid.svg" alt=""
        /></span>

        <div :class="isDropdownHidden ? 'hidden' : 'showed'" ref="hiddenLinks">
          <RouterLink
            @click="isDropdownHidden = !isDropdownHidden"
            :to="{ name: 'trips' }"
            >My trips</RouterLink
          >
          <button @click="logout">Logout</button>
        </div>
      </div>

      <div v-else class="flex gap-3">
        <RouterLink
          :to="{ name: 'login' }"
          class="bg-emerald-600 text-white p-2 text-lg font-semibold rounded-lg"
        >
          Login
        </RouterLink>

        <RouterLink
          :to="{ name: 'register' }"
          class="bg-emerald-600 text-white p-2 text-lg font-semibold rounded-lg"
        >
          Register
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100vw;
  background: rgba(255, 255, 255, 0.162);
  backdrop-filter: blur(15px);
  z-index: 1;
}

.hidden {
  display: none;
}

.actions {
  position: relative;
}

.showed {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: absolute;
  top: 20px;
  background: rgba(200, 200, 200, 0.46);
  backdrop-filter: blur(10px); /* not working */
  & a {
    white-space: nowrap;
    display: block;
    font-size: 1.1rem;
    padding: 10px 0;
  }
}
</style>
