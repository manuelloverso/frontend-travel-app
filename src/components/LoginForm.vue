<script>
import axios from "axios";
import { store } from "../store";

export default {
  name: "LoginForm",
  data() {
    return {
      store,
      data: {
        email: "manuel@gmail.com",
        password: "password",
      },
      errors: null,
    };
  },

  computed: {
    user() {
      return store.user;
    },
  },

  methods: {
    async login() {
      this.errors = null;
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      try {
        let res = await axios.post(
          "http://localhost:8000/api/login",
          this.data
        );
        console.log("login response", res);

        store.user = res.data.user;
      } catch (err) {
        console.error(err);
        store.user = null;
        this.errors = err.response.data.errors;
      }
    },
  },
};
</script>
<template>
  <h2 class="font-medium text-2xl">Login Form</h2>
  <form @submit.prevent="login">
    <div>
      <label for="email">Type your email</label>
      <input
        v-model="data.email"
        type="text"
        name="email"
        placeholder="email"
      />
      <p v-if="errors?.email" class="text-red-500">
        {{ errors.email[0] }}
      </p>
    </div>
    <div>
      <label for="password">Type your password</label>
      <input
        v-model="data.password"
        type="text"
        name="password"
        placeholder="password"
      />
      <p v-if="errors?.password" class="text-red-500">
        {{ errors.password[0] }}
      </p>
    </div>
    <button class="bg-red-800 text-white p-2 rounded-lg" type="submit">
      Send
    </button>
  </form>

  <h2 class="text-3xl font-bold" v-if="user">hello {{ user.name }}</h2>
</template>
<style scoped></style>
